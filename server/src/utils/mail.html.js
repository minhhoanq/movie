const confirmSignup = (verificationCode) => {
    return `<h2>Mã xác nhận đăng ký tài khoản của bạn là:</h2> 
<br/><blockquote>${verificationCode}</blockquote>
<h4>Vui lòng không chia sẻ mã này cho bất kỳ ai, hoặc app, website không phải của chúng tôi!</h4>
<h4>Mã này sẽ hết hạn sau 5 phút kể từ bây giờ.</h4>
<h4>Cảm ơn và chúc bạn trải nghiệm dịch vụ vui vẻ <3</h4>`;
};

const resetPasswordMail = (resetTokenPassword) => {
    return `Vui lòng click vào link dưới đây để thay đổi mật khẩu. Link này sẽ hết hạn sau 10 phút kể từ bây giờ. 
            <a href=${process.env.URL_CLIENT}/reset-password/${resetTokenPassword}>Nhấn vào đây</a>`;
};

module.exports = {
    confirmSignup,
    resetPasswordMail,
};
