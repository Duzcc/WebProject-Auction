import { createFromHTML } from '../../utils/dom.js';

/**
 * AboutIntro Component
 * Displays introduction text about VPA
 */
export function AboutIntro() {
    const html = `
        <div class="py-12 md:py-16">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-8 text-center">
                Lời giới thiệu
            </h1>
            
            <div class="max-w-4xl mx-auto text-center space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                    Công ty Đấu giá hợp danh VPA xin gửi lời chào trân trọng nhất đến quý khách hàng.
                </p>
                <p>
                    Công ty Đấu giá hợp danh Việt Nam (Vietnam Partnerships Auction) - là một Tổ chức hoạt động chuyên nghiệp trong lĩnh vực dịch vụ tư vấn, tổ chức đấu giá tài sản, quyền tài sản, vật tư, thiết bị, hàng hóa và các dịch vụ khác liên quan đến đấu giá tài sản. Công ty Đấu giá hợp danh Việt Nam được nhiều Cơ quan, Tập đoàn, doanh nghiệp, đơn vị, tổ chức tin cậy, ký hợp đồng bán đấu giá tài sản, trong đó nhiều hợp đồng với tài sản có giá trị lớn, có tính chất phức tạp. Chúng tôi luôn nỗ lực không ngừng nghỉ, với mục tiêu luôn là tổ chức đấu giá tài sản thuộc hàng đầu tại Việt Nam. "Chuyên nghiệp, tin cậy, đặt quyền lợi của khách hàng lên trên quyền lợi của Công ty" là phương châm hoạt động của chúng tôi khi hợp tác cùng Quý khách hàng. Chúng tôi cam kết mang đến cho Quý khách hàng dịch vụ chuyên nghiệp, chất lượng và hiệu quả tối ưu trong lĩnh vực đấu giá tài sản.
                </p>
            </div>
        </div>
    `;

    return createFromHTML(html);
}
