export default function renderTemplate(
  name: string,
  surname: string,
  course: string,
): string {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Info</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .header {
      background-color: #222740;
      width: 100%;
      padding: 5px 7px;
      display: flex;
      align-items: center;
    }

    .logo {
      max-width: 150px;
      width: 100%;
    }

    .date {
      color: white;
      font-size: large;
      margin-left: auto;
    }

    .content {
      width: 100%;
      padding: 10px;
    }

    .greeting {
      font-size: 21px;
    }

    .user {
      font-weight: 700;
      margin-right: 3px;
    }

    .info {
      font-size: 17px;
      margin-top: 12px;
    }

    .list {
      padding: 7px;
      margin-left: 10px;
    }

    .confirmation {
      width: 100%;
      display: flex;
      justify-items: end;
      padding: 10px 0;
      margin-top: 15px;
    }

    .confirm-button {
      text-decoration: none;
      padding: 5px 8px;
      border-radius: 7px;
      background: #19e302;
      color: white;
      margin-left: auto;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="cid:it-center.pro" alt="Logo">
      </div>
      <span class="date">12 Nov, 2024</span>
    </div>
    <div class="content">
      <span class="greeting">Hey <b>Admin</b>,</span>
      <p class="info">E'tiboringizga kursimizga yangi foydalanuvchi ro'yxatdan o'tganligini bildirmoqchiman. Ularning
        ro'yxatga olish tafsilotlari quyidagicha:</p>
      <ul class="list">
        <li>
          <span class="user">Ism:</span>
          ${name}
        </li>
        <li>
          <span class="user">Familiya:</span>
          ${surname}
        </li>
        <li>
          <span class="user">Kurs:</span>
          ${course}
        </li>
      </ul>
      <p class="info">Iltimos, yangi foydalanuvchining ro'yxatdan o'tish jarayoni zudlik bilan amalga oshirilishiga va
        ular kurs materiallari va resurslariga kirish uchun barcha kerakli ma'lumotlarni olishiga ishonch hosil qiling.
      </p>
      <div class="confirmation">
        <a href="#" class="confirm-button">Tasdiqlash</a>
      </div>
    </div>
  </div>
</body>

</html>
  `;
}
