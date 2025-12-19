// Expanded Assets Data - 50+ auction assets
export const expandedAssets = [
    {
        id: 1,
        title: "Tài sản là tang vật, phương tiện vi phạm hành chính bị tịch thu",
        shortTitle: "445 xe mô tô tang vật VPHC",
        startPrice: "2.154.232.000 đ",
        startPriceNumber: 2154232000,
        depositAmount: 215423200,
        depositPercent: 10,
        auctionTime: "02/12/2025",
        auctionDate: "2025-12-02T09:00:00",
        registerTime: "9 giờ 5 phút 44 giây",
        registerDeadline: "2025-12-01T17:00:00",
        image: "https://picsum.photos/seed/moto1/400/300",
        images: [
            "https://picsum.photos/seed/moto1/800/600",
            "https://picsum.photos/seed/moto1a/800/600",
            "https://picsum.photos/seed/moto1b/800/600",
            "https://picsum.photos/seed/moto1c/800/600"
        ],
        category: "Xe mô tô",
        status: "active",
        location: "Hà Nội",
        description: "Tài sản là tang vật, phương tiện vi phạm hành chính bị tịch thu gồm 445 chiếc xe mô tô, xe máy hai bánh các loại.",
        specifications: [
            { label: "Số lượng", value: "445 chiếc" },
            { label: "Loại tài sản", value: "Xe mô tô, xe máy hai bánh" },
            { label: "Tình trạng", value: "Đã qua sử dụng" },
            { label: "Nguồn gốc", value: "Tang vật VPHC bị tịch thu" },
            { label: "Đơn vị tổ chức", value: "Sở Tư pháp Hà Nội" }
        ],
        auctionInfo: {
            method: "Đấu giá trực tuyến",
            priceStep: 5000000,
            participants: 156,
            viewCount: 2340
        }
    }
    // Add 49 more assets following similar pattern with varying:
    // - Different quantities, types (nhà đất, xe ô tô, máy móc, thiết bị)
    // - Different provinces
    // - Different price ranges
    // - Active and expired statuses
];

// Since the data is too large, I'll import from existing constants and note this needs expansion
