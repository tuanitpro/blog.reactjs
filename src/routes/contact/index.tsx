import { ToastContainer, toast } from "react-toastify";
import { IoMailOutline, IoCallOutline } from "react-icons/io5";
import contact from "@static/image/contact.jpg";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import PageLayout from "@layouts/PageLayout";
import { Loader } from "@components/Loader";

type FormModel = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const Contact = () => {
  const title = "Liên hệ";
  const sendMutation = useMutation({
    mutationFn: async (variables: FormModel) => {
      const telegramUrl = `https://api.telegram.org/bot${
        import.meta.env.REACT_APP_TELEGRAM_TOKEN
      }/sendMessage`;

      const text = `
New message from ${variables.name}
Email: ${variables.email}
Subject: ${variables.subject}
Message: ${variables.message}
          `;
      return await axios.post(telegramUrl, {
        chat_id: import.meta.env.REACT_APP_TELEGRAM_TO,
        text: text,
      });
    },
    onSettled() {
      toast("🦄 Cảm ơn bạn đã để lại liên hệ.");
    },
    onError() {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại");
    },
  });
  async function formPost(formData: FormData) {
    const rawFormData: any = {
      name: formData?.get("your-name"),
      email: formData?.get("your-email"),
      subject: formData?.get("your-subject"),
      message: formData?.get("your-message"),
    };
    sendMutation.mutateAsync(rawFormData);
  }
  return (
    <PageLayout title={title}>
      <article className="has-post-thumbnail hentry">
        <div className="post-thumbnail">
          <img width="100%" height="510" src={contact} alt="Blog of Tuan" />
        </div>

        <header className="entry-header">
          <h1 className="entry-title">{title}</h1>
        </header>
        <div className="entry-content">
          <span>
            {" "}
            Nếu bạn có bất kỳ thắc mắc nào về blog hoặc các trang web nói chung,
            xin đừng ngần ngại liên hệ với tôi. Nếu bạn có một câu hỏi kỹ thuật,
            hãy chắc chắn để bao gồm càng nhiều chi tiết càng tốt để tôi có thể
            cung cấp sự hỗ trợ tốt nhất cho bạn. Nếu bạn muốn tôi thiết kế
            website hay cài đặt blog của bạn, hãy liên hệ với tôi.
            <br />
            Tôi trả lời cho tất cả các email phản hồi. <IoMailOutline />{" "}
            tuanitpro@gmail.com hoặc: <br />
            <IoCallOutline name="call" /> 097 6060 432
          </span>
          <hr />
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <form action={formPost}>
              <p>
                <label>
                  {" "}
                  Tên bạn
                  <br />
                  <span data-name="your-name">
                    <input
                      size={40}
                      maxLength={400}
                      required
                      type="text"
                      name="your-name"
                    />
                  </span>{" "}
                </label>
              </p>
              <p>
                <label>
                  {" "}
                  Email
                  <br />
                  <span data-name="your-email">
                    <input
                      size={40}
                      maxLength={400}
                      type="email"
                      name="your-email"
                      required
                    />
                  </span>{" "}
                </label>
              </p>
              <p>
                <label>
                  {" "}
                  Tiêu đề (Tuỳ chọn)
                  <br />
                  <span data-name="your-subject">
                    <input
                      size={40}
                      maxLength={400}
                      aria-invalid="false"
                      type="text"
                      name="your-subject"
                    />
                  </span>{" "}
                </label>
              </p>
              <p>
                <label>
                  Nội dung
                  <br />
                  <span data-name="your-message">
                    <textarea name="your-message" rows={5} maxLength={2000} />
                  </span>
                </label>
              </p>
              <button type="submit">
                {sendMutation?.isPending ? "Đang gửi..." : "Gửi ngay"}
              </button>

              {sendMutation?.isPending && <Loader />}
            </form>
            {sendMutation?.isPending && (
              <div
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                }}
              >
                <Loader />
              </div>
            )}
          </div>
        </div>
      </article>
      <ToastContainer />
    </PageLayout>
  );
};

export default Contact;
