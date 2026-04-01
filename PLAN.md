# Website Redesign Plan

---

## Context

1. New API endpoint for search post at https://api.tuanitpro.com/v1/posts?search=Post 20&categoryId=d18eac8c-2249-4bad-af23-2c4b804e182b&limit=1&page=1
Sample output 
``` json
{
    "items": [
        {
            "id": "dbdd51d0-6d18-4f35-b6e9-4dec6de9d700",
            "title": "Langflow AI là gì? Review & So sánh từ góc nhìn lập trình viên đã build chatbot thực tế",
            "slug": "langflow-ai-la-gi-review-so-sanh-tu-goc-nhin-lap-trinh-vien-da-build-chatbot-thuc-te",
            "image": "https://picsum.photos/seed/langflow-ai-la-gi-review-so-sanh-tu-goc-nhin-lap-trinh-vien-da-build-chatbot-thuc-te/600/400",
            "gallery": [],
            "createdAt": "2026-01-31T19:00:41.000Z",
            "updatedAt": "2026-04-01T03:35:43.000Z",
            "category": {
                "id": "d18eac8c-2249-4bad-af23-2c4b804e182b",
                "name": "Uncategorized",
                "slug": "uncategorized",
                "image": "https://picsum.photos/seed/category-uncategorized/400/300"
            },
            "excerpt": "❓Vì sao Langflow xuất hiện? Trong làn sóng phát triển của LLM, chatbot, RAG và AI internal tool , lập trình viên đang đối mặt với một vấn đề quen thuộc: “Ý tưởng thì đơn giản, nhưng để build một AI workflow hoàn chỉnh bằng code thuần lại tốn rất nhiều thời gian.” LangChain ra đời để giải quyết phần logic, nhưng khi dự án lớn dần: Flow phức tạp Debug khó Product team khó tham gia Thay đổi nhỏ cũng phải sửa code Langflow AI xuất hiện như một lời giải: 👉 Kết hợp sức mạnh của LangChain với giao diện visual flow trực quan. Langflow AI là gì? Langflow là một công cụ visual builder cho phép bạn: Thiết kế AI workflow / LLM pipeline bằng cách kéo – thả Kết nối prompt, LLM, memory, retriever, vector DB Xuất flow thành API endpoint để tích hợp vào sản phẩm thật Nói ngắn gọn: Langflow = LangChain + Visual UI + API-ready Trải nghiệm thực tế: Build chatbot với Langflow Từ góc nhìn của mình — đã build chatbot và đang sử dụng Langflow trong sản phẩm thực tế , điểm mạnh nhất của Langflow là: 🚀 Xây dựng AI workflow cực nhanh Thay vì viết hàng trăm dòng code LangChain, bạn có thể: Kéo LLM node (OpenAI, Azure OpenAI, v.v.) Gắn Prompt Template Thêm Memory (ConversationBuffer, Summary Memory) Kết nối Retriever cho RAG 👉 Một flow chatbot hoàn chỉnh có thể build trong vài giờ , thay vì vài ngày nếu code tay. 🧠 Rất phù hợp cho chatbot, RAG và internal AI tool Langflow hoạt động cực tốt với: Chatbot hỏi đáp nội bộ RAG (PDF, docs, knowledge base) AI assistant cho team kỹ thuật / vận hành Prototype AI cho startup Đặc biệt, với internal tool..."
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 1,
        "total": 58,
        "totalPages": 58,
        "hasNext": true,
        "hasPrev": false
    }
}```
2. API endpoint get by slug: /v1/posts/slug/sample-post-20

``` json
{
    "id": "c3517900-bc53-4d3a-a6cd-ddba7ff5bddb",
    "title": "Sample Post 20",
    "slug": "sample-post-20",
    "content": "This is the content of sample post 20. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "image": "https://picsum.photos/seed/post-20/600/400",
    "gallery": [],
    "createdAt": "2026-04-01T03:30:57.586Z",
    "updatedAt": "2026-04-01T03:30:57.586Z",
    "category": {
        "id": "d18eac8c-2249-4bad-af23-2c4b804e182b",
        "name": "Uncategorized",
        "slug": "uncategorized",
        "image": "https://picsum.photos/seed/category-uncategorized/400/300"
    },
    "excerpt": "This is the content of sample post 20. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}```

3. API endpoint Get CategoryBySlug /v1/categories/slug/dot-net

``` json
{
    "id": "75829272-d8f6-4345-b2c3-99da892c3079",
    "name": ".NET",
    "slug": "dot-net",
    "image": "https://picsum.photos/seed/category-dot-net/400/300",
    "order": 0,
    "parent": null
}```



## Tasks
- Replace GrapQL by RestfulAPI at the file
hooks/useSearchQuery
hooks/usePostsQuery
PostLits
CategoryPage
SearchModal
Modal

## Output
Product ready
Need npm run lint, npm run build