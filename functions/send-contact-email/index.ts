import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { messageId } = await req.json();

    if (!messageId) {
      return new Response(
        JSON.stringify({ error: '缺少留言ID' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: message, error: fetchError } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .eq('id', messageId)
      .single();

    if (fetchError || !message) {
      return new Response(
        JSON.stringify({ error: '留言不存在' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      await supabaseAdmin
        .from('contact_messages')
        .update({ status: 'failed' })
        .eq('id', messageId);

      return new Response(
        JSON.stringify({ error: '邮件服务未配置，请联系管理员设置 RESEND_API_KEY' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: '2784926322@qq.com',
        subject: `【团队官网留言】来自 ${message.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
              新留言通知
            </h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>姓名：</strong>${message.name}</p>
              <p style="margin: 10px 0;"><strong>邮箱：</strong>${message.email}</p>
              <p style="margin: 10px 0;"><strong>时间：</strong>${new Date(message.created_at).toLocaleString('zh-CN')}</p>
            </div>
            <div style="background: #fff; padding: 20px; border-left: 4px solid #1e3a8a; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e3a8a;">留言内容</h3>
              <p style="white-space: pre-wrap;">${message.message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
            <p style="color: #64748b; font-size: 12px;">
              此邮件由西南石油大学超算团队官网自动发送
            </p>
          </div>
        `,
        reply_to: message.email,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('邮件发送失败:', errorData);
      
      await supabaseAdmin
        .from('contact_messages')
        .update({ status: 'failed' })
        .eq('id', messageId);

      return new Response(
        JSON.stringify({ error: '邮件发送失败', details: errorData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    await supabaseAdmin
      .from('contact_messages')
      .update({ status: 'sent' })
      .eq('id', messageId);

    return new Response(
      JSON.stringify({ success: true, message: '邮件发送成功' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('处理请求时出错:', error);
    return new Response(
      JSON.stringify({ error: '服务器内部错误' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});