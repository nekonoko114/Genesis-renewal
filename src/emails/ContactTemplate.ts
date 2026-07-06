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
  // ライバー向けかどうかを判定
  const isLiver = subject.startsWith('liver_');

  // ▼ テーマ設定
  const theme = {
    // ライバー: サイバーシアン / 法人: ネイビー
    primaryColor: isLiver ? '#fff97eff' : '#39385c',      
    // ライバー: サイバーマゼンタ / 法人: レッド
    accentColor: isLiver ? '#a1ff59ff' : '#d0524f',       
    // ライバー: ダークネイビー（黒系） / 法人: ライトグレー
    bgColor: isLiver ? '#0f172a' : '#f3f4f6',           
    // ライバー: ダークグレー / 法人: ホワイト
    cardBgColor: isLiver ? '#1e293b' : '#ffffff',
    // ライバー: カード枠線の色 / 法人: カード枠線の色
    borderColor: isLiver ? '#334155' : '#e2e8f0',
    // ライバー: 白文字 / 法人: 黒文字
    textColor: isLiver ? '#f8fafc' : '#1e293b',
    // ライバー: サブテキスト（グレー）
    subTextColor: isLiver ? '#cbd5e1' : '#374151',
    bgImageUrl: isLiver 
      ? 'https://genesis-llc.co.jp/images/liver_bg_base.png' 
      : 'https://genesis-llc.co.jp/images/corporate_bg_base.png',
    title: isLiver ? 'LIVER MANAGEMENT' : 'CORPORATE',
  };

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>お問い合わせ内容の確認</title>
  <style type="text/css">
    body {
      background-color: ${theme.bgColor};
      font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: ${theme.bgColor};
      background-image: url('${theme.bgImageUrl}');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      padding: 40px 0;
    }
    .container {
      background-color: ${theme.cardBgColor};
      margin: 0 auto;
      max-width: 600px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.2), 0 4px 8px -4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: ${theme.cardBgColor};
      padding: 30px 40px;
      text-align: center;
      border-bottom: 4px solid ${theme.accentColor};
    }
    .logo {
      font-size: 32px;
      font-weight: 900;
      color: ${theme.primaryColor};
      text-decoration: none;
      letter-spacing: -0.5px;
    }
    .logo span {
      color: ${theme.accentColor};
    }
    .tagline {
      font-size: 11px;
      color: ${theme.accentColor};
      letter-spacing: 2px;
      margin-top: 4px;
      text-transform: uppercase;
      font-weight: bold;
    }
    .content {
      padding: 40px;
    }
    .greeting {
      font-size: 16px;
      color: ${theme.subTextColor};
      line-height: 1.6;
      margin-bottom: 30px;
      font-weight: 500;
    }
    .greeting span {
      color: ${theme.primaryColor};
      font-weight: 700;
      font-size: 14px;
      display: inline-block;
      margin-bottom: 8px;
      background-color: ${isLiver ? '#0f172a' : '#f3f4f6'};
      padding: 4px 12px;
      border-radius: 20px;
    }
    .data-card {
      background-color: ${isLiver ? '#0f172a' : '#f8fafc'};
      border: 1px solid ${theme.borderColor};
      border-radius: 8px;
      padding: 24px;
    }
    .field {
      margin-bottom: 20px;
    }
    .field:last-child {
      margin-bottom: 0;
    }
    .label {
      font-size: 12px;
      font-weight: 700;
      color: ${theme.primaryColor};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .value {
      font-size: 15px;
      color: ${theme.textColor};
      line-height: 1.5;
      font-weight: 500;
    }
    .message-box {
      font-size: 15px;
      color: ${theme.textColor};
      line-height: 1.7;
      white-space: pre-wrap;
      margin-top: 8px;
      background-color: ${theme.cardBgColor};
      padding: 16px;
      border-radius: 6px;
      border: 1px solid ${theme.borderColor};
    }
    .footer {
      background-color: ${isLiver ? '#0f172a' : theme.primaryColor};
      padding: 24px 40px;
      text-align: center;
      border-top: 1px solid ${theme.borderColor};
    }
    .footer-text {
      color: ${isLiver ? '#64748b' : '#e2e8f0'};
      font-size: 12px;
      line-height: 1.5;
      margin: 0;
    }
    .footer-link {
      color: #ffffff;
      text-decoration: underline;
      font-weight: 600;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        border-radius: 0 !important;
      }
      .content {
        padding: 30px 20px !important;
      }
      .header {
        padding: 24px 20px !important;
      }
      .data-card {
        padding: 20px 16px !important;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      
      <!-- ヘッダーエリア -->
      <div class="header">
        <div class="logo">Genesis<span>.</span></div>
        <div class="tagline">${theme.title} INQUIRY</div>
      </div>

      <!-- メインコンテンツ -->
      <div class="content">
        <div class="greeting">
          <span>${theme.title}</span><br>
          Webサイトから新しいお問い合わせを受信しました。<br>
          以下の内容をご確認ください。
        </div>

        <div class="data-card">
          <div class="field">
            <div class="label">お問い合わせ種別</div>
            <div class="value">${getSubjectText(subject)}</div>
          </div>

          <div class="field">
            <div class="label">お名前</div>
            <div class="value">${data.name} 様</div>
          </div>

          <div class="field">
            <div class="label">電話番号</div>
            <div class="value"><a href="tel:${data.tel}" style="color: ${theme.textColor}; text-decoration: underline;">${data.tel}</a></div>
          </div>

          <div class="field">
            <div class="label">メールアドレス</div>
            <div class="value"><a href="mailto:${data.email}" style="color: ${theme.textColor}; text-decoration: underline;">${data.email}</a></div>
          </div>

          <div class="field">
            <div class="label">お問い合わせ内容</div>
            <div class="message-box">${data.message}</div>
          </div>
        </div>
      </div>

      <!-- フッターエリア -->
      <div class="footer">
        <p class="footer-text">
          このメールは <a href="https://genesis-llc.co.jp" class="footer-link">Genesis合同会社</a> のWebサイトから自動送信されています。<br>
          &copy; 2026 Genesis LLC. All Rights Reserved.
        </p>
      </div>

    </div>
  </div>
</body>
</html>
  `;
};


