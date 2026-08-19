export const getSubjectText = (val: string) => {
  const map: Record<string, string> = {
    corporate_service: 'サービス導入・協業に関するご相談',
    corporate_recruit: '人材採用・パートナーシップのご相談',
    corporate_other: 'その他（コーポレート関連）',
    liver_audition: 'ライバー所属・オーディション応募',
    liver_business: '企業案件・コラボレーションのご相談',
    liver_other: 'その他（ライバーマネジメント関連）'
  };
  return map[val] || val;
};

export const getContactTemplateHtml = (subject: string, data: { name: string, tel: string, email: string, message: string }) => {
  const isLiver = subject.startsWith('liver_');
  const theme = {
    primaryColor: isLiver ? '#fff97eff' : '#39385c',      
    accentColor: isLiver ? '#a1ff59ff' : '#d0524f',       
    bgColor: isLiver ? '#0f172a' : '#f3f4f6',           
    cardBgColor: isLiver ? '#1e293b' : '#ffffff',
    borderColor: isLiver ? '#334155' : '#e2e8f0',
    textColor: isLiver ? '#f8fafc' : '#1e293b',
    subTextColor: isLiver ? '#cbd5e1' : '#374151',
    bgImageUrl: isLiver 
      ? 'https://genesis-llc.co.jp/images/liver_bg_base.png' 
      : 'https://genesis-llc.co.jp/images/corporate_bg_base.png',
    title: isLiver ? 'LIVER MANAGEMENT' : 'CORPORATE',
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="background-color: ${theme.bgColor}; padding: 40px; font-family: sans-serif;">
  <div style="background-color: ${theme.cardBgColor}; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 8px;">
    <h2 style="color: ${theme.primaryColor};">${theme.title} INQUIRY</h2>
    <p style="color: ${theme.textColor};">新しいお問い合わせを受信しました。</p>
    <hr style="border-color: ${theme.borderColor};">
    <p style="color: ${theme.textColor};"><strong>お問い合わせ種別:</strong> ${getSubjectText(subject)}</p>
    <p style="color: ${theme.textColor};"><strong>お名前:</strong> ${data.name} 様</p>
    <p style="color: ${theme.textColor};"><strong>電話番号:</strong> ${data.tel}</p>
    <p style="color: ${theme.textColor};"><strong>メールアドレス:</strong> ${data.email}</p>
    <p style="color: ${theme.textColor};"><strong>内容:</strong><br>${data.message}</p>
  </div>
</body>
</html>
  `;
};

export interface Env {
  CONTACT_RESEND_API_KEY: string;
  FROM_EMAIL: string;
  TO_EMAIL: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data = await context.request.formData();
    const subject = data.get('subject')?.toString() || '';
    const name = data.get('name')?.toString() || '';
    const tel = data.get('tel')?.toString() || '';
    const email = data.get('email')?.toString() || '';
    const message = data.get('message')?.toString() || '';

    // バリデーション
    if (!subject || !name || !tel || !email) {
      return new Response(
        JSON.stringify({ error: '必須項目が入力されていません。' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // 環境変数の取得（フォールバック付き）
    const fromEmail = context.env.FROM_EMAIL || 'info@genesis-llc.co.jp';
    const toEmail = context.env.TO_EMAIL || 'info@genesis-llc.co.jp';
    const apiKey = context.env.CONTACT_RESEND_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'サーバーのAPIキー設定が不足しています。' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // HTMLメールの生成
    const html = getContactTemplateHtml(subject, { name, tel, email, message });

    // ResendのAPIを直接叩く
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Genesis お問い合わせ <${fromEmail}>`,
        to: [toEmail],
        subject: `Webサイトからのお問い合わせ: ${name} 様`,
        html: html,
        reply_to: email,
      }),
    });

    const resendData = await res.json();

    if (!res.ok) {
      throw new Error(resendData.message || 'メール送信に失敗しました');
    }

    return new Response(JSON.stringify({ success: true, data: resendData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : "メール送信でエラーが発生しました";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
