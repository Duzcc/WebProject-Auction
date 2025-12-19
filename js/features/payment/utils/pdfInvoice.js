/**
 * PDF Invoice Generation Utility
 * Generates professional PDF invoices using jsPDF
 */

/**
 * Remove Vietnamese accents and special characters
 * @param {string} str - Input string
 * @returns {string} ASCII string
 */
function removeVietnameseAccents(str) {
    if (!str) return '';

    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Additional Vietnamese character replacements
    const vietnameseMap = {
        'đ': 'd', 'Đ': 'D',
        'ă': 'a', 'Ă': 'A',
        'â': 'a', 'Â': 'A',
        'ê': 'e', 'Ê': 'E',
        'ô': 'o', 'Ô': 'O',
        'ơ': 'o', 'Ơ': 'O',
        'ư': 'u', 'Ư': 'U'
    };

    Object.keys(vietnameseMap).forEach(key => {
        str = str.replace(new RegExp(key, 'g'), vietnameseMap[key]);
    });

    return str;
}

/**
 * Generate PDF invoice from invoice data
 * @param {Object} invoiceData - Invoice data from generateInvoice()
 * @returns {Blob} PDF blob for download
 */
export function generatePDFInvoice(invoiceData) {
    // eslint-disable-next-line no-undef
    const { jsPDF } = window.jspdf;

    if (!jsPDF) {
        console.error('jsPDF library not loaded');
        return null;
    }

    const doc = new jsPDF();

    // Fix customer name if it's an email (from old payments)
    let displayName = invoiceData.customerName;
    if (displayName && displayName.includes('@')) {
        // Try to get real name from vpa_users
        try {
            const users = JSON.parse(localStorage.getItem('vpa_users') || '[]');
            const user = users.find(u => u.email === invoiceData.customerId || u.email === displayName);
            if (user && user.fullName) {
                displayName = user.fullName;
            }
        } catch (error) {
            console.error('Error getting user name:', error);
        }
    }

    // Remove Vietnamese accents from name
    displayName = removeVietnameseAccents(displayName);

    // Colors - cleaner palette
    const darkText = [31, 41, 55]; // #1f2937
    const mediumGray = [107, 114, 128]; // #6b7280
    const lightGray = [209, 213, 219]; // #d1d5db
    const borderGray = [229, 231, 235]; // #e5e7eb

    let yPos = 20;

    // Header - Company Info (clean, no background)
    doc.setTextColor(...darkText);
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('VPA AUCTION', 20, yPos);

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...mediumGray);
    doc.text('Cong ty Dau gia Hop danh Viet Nam', 20, yPos + 6);

    // Contact info (right-aligned)
    doc.setFontSize(8);
    doc.text('www.vpa-auction.vn', 190, yPos, { align: 'right' });
    doc.text('contact@vpa-auction.vn', 190, yPos + 4, { align: 'right' });
    doc.text('(+84) 123-456-789', 190, yPos + 8, { align: 'right' });

    yPos += 15;

    // Line separator
    doc.setDrawColor(...borderGray);
    doc.setLineWidth(1);
    doc.line(20, yPos, 190, yPos);

    yPos += 10;

    // Title - "HOA DON THANH TOAN"
    doc.setTextColor(...darkText);
    doc.setFontSize(22);
    doc.setFont(undefined, 'bold');
    doc.text('HOA DON THANH TOAN', 105, yPos, { align: 'center' });

    yPos += 12;

    // Two-column layout: Customer Info | Invoice Details
    const leftCol = 20;
    const rightCol = 110;

    // Left: THONG TIN KHACH HANG
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('THONG TIN KHACH HANG', leftCol, yPos);

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...mediumGray);
    doc.text('Ho ten:', leftCol, yPos + 6);
    doc.setTextColor(...darkText);
    doc.setFont(undefined, 'bold');
    doc.text(displayName, leftCol + 12, yPos + 6);

    doc.setFont(undefined, 'normal');
    doc.setTextColor(...mediumGray);
    doc.text('Ma KH:', leftCol, yPos + 12);
    doc.setTextColor(...darkText);
    doc.setFont(undefined, 'bold');
    doc.text(invoiceData.customerId, leftCol + 12, yPos + 12);

    // Right: CHI TIET HOA DON
    doc.setFont(undefined, 'bold');
    doc.text('CHI TIET HOA DON', rightCol, yPos);

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...mediumGray);
    doc.text('So hoa don:', rightCol, yPos + 6);
    doc.setTextColor(...darkText);
    doc.setFont(undefined, 'bold');
    doc.text(invoiceData.invoiceNumber, rightCol + 20, yPos + 6);

    doc.setFont(undefined, 'normal');
    doc.setTextColor(...mediumGray);
    doc.text('Ngay:', rightCol, yPos + 12);
    doc.setTextColor(...darkText);
    doc.setFont(undefined, 'bold');
    doc.text(new Date(invoiceData.date).toLocaleDateString('vi-VN'), rightCol + 20, yPos + 12);

    yPos += 20;

    // Table: Mo ta | So tien (VND)
    doc.setDrawColor(...borderGray);
    doc.setLineWidth(0.5);

    // Table header
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...darkText);

    // Top border
    doc.line(20, yPos, 190, yPos);
    yPos += 5;

    doc.text('Mo ta', 25, yPos);
    doc.text('So tien (VND)', 185, yPos, { align: 'right' });

    yPos += 3;
    // Header bottom border
    doc.line(20, yPos, 190, yPos);

    // Table rows
    doc.setFont(undefined, 'normal');
    invoiceData.items.forEach((item) => {
        yPos += 6;
        const cleanDesc = removeVietnameseAccents(item.description);

        doc.setTextColor(...mediumGray);
        doc.text(cleanDesc, 25, yPos);

        doc.setTextColor(...darkText);
        doc.setFont(undefined, 'bold');
        doc.text(item.amount.toLocaleString('vi-VN'), 185, yPos, { align: 'right' });
        doc.setFont(undefined, 'normal');

        yPos += 3;
        // Row separator
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.3);
        doc.line(20, yPos, 190, yPos);
    });

    yPos += 8;

    // Totals section
    doc.setFontSize(9);
    doc.setTextColor(...mediumGray);
    doc.text('Tong gia trung thau:', 25, yPos);
    doc.setTextColor(...darkText);
    doc.setFont(undefined, 'bold');
    doc.text(invoiceData.subtotal.toLocaleString('vi-VN'), 185, yPos, { align: 'right' });

    yPos += 6;
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...mediumGray);
    doc.text('Da dat coc:', 25, yPos);
    doc.setTextColor(...darkText);
    doc.text(`-${invoiceData.deposit.toLocaleString('vi-VN')}`, 185, yPos, { align: 'right' });

    yPos += 5;
    // Separator line before total
    doc.setDrawColor(...borderGray);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);

    yPos += 8;

    // TONG THANH TOAN (bold, larger)
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...darkText);
    doc.text('TONG THANH TOAN:', 25, yPos);
    doc.setFontSize(13);
    doc.text(`${invoiceData.total.toLocaleString('vi-VN')} VND`, 185, yPos, { align: 'right' });

    yPos += 5;
    // Bottom border
    doc.setDrawColor(...borderGray);
    doc.setLineWidth(1);
    doc.line(20, yPos, 190, yPos);

    yPos += 10;

    // Payment Information
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...darkText);
    doc.text('THONG TIN THANH TOAN', 20, yPos);

    yPos += 6;
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...mediumGray);
    doc.text('Phuong thuc:', 20, yPos);
    doc.setTextColor(...darkText);
    doc.setFont(undefined, 'bold');
    doc.text(invoiceData.paymentMethod.toUpperCase() || 'BANK_TRANSFER', 45, yPos);

    yPos += 6;
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...mediumGray);
    doc.text('Ma giao dich:', 20, yPos);
    doc.setTextColor(...darkText);
    doc.setFont(undefined, 'bold');
    doc.text(invoiceData.transactionRef || 'N/A', 45, yPos);

    yPos += 6;
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...mediumGray);
    doc.text('Trang thai:', 20, yPos);
    doc.setTextColor(34, 197, 94); // green
    doc.setFont(undefined, 'bold');
    doc.text(invoiceData.status === 'completed' ? 'DA THANH TOAN' : 'DANG XU LY', 45, yPos);

    // Footer message
    yPos += 15;
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.3);
    doc.line(20, yPos, 190, yPos);

    yPos += 8;
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...mediumGray);
    doc.text('Cam on quy khach da su dung dich vu dau gia cua VPA!', 105, yPos, { align: 'center' });
    doc.setFontSize(7);
    doc.text('Hoa don nay duoc tao tu dong va co gia tri phap ly.', 105, yPos + 4, { align: 'center' });

    return doc;
}

/**
 * Download PDF invoice
 * @param {Object} invoiceData - Invoice data from generateInvoice()
 */
export function downloadPDFInvoice(invoiceData) {
    const doc = generatePDFInvoice(invoiceData);

    if (doc) {
        doc.save(`${invoiceData.invoiceNumber}.pdf`);
        return true;
    }

    return false;
}

/**
 * Get PDF as blob for preview or email attachment
 * @param {Object} invoiceData - Invoice data
 * @returns {Blob} PDF blob
 */
export function getPDFBlob(invoiceData) {
    const doc = generatePDFInvoice(invoiceData);

    if (doc) {
        return doc.output('blob');
    }

    return null;
}

export default {
    generatePDFInvoice,
    downloadPDFInvoice,
    getPDFBlob
};
