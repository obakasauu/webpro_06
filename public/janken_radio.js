// public/janken_radio.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const radioButtons = document.querySelectorAll("input[name='hand']");

  // ラジオボタン選択でフォーム送信
  radioButtons.forEach(radio => {
    radio.addEventListener("change", () => {
      form.submit();
    });
  });
});