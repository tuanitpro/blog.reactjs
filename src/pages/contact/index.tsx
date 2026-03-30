import { motion } from "motion/react";
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
  turnstileToken?: string;
};

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const Contact = () => {
  const title = "Liên hệ";
  const sendMutation = useMutation({
    mutationFn: async (variables: FormModel) => {
      return await axios.post(import.meta.env.VITE_WORKER_URL, variables);
    },
    onSettled() {
      toast("🦄 Cảm ơn bạn đã để lại liên hệ.");
    },
    onError() {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại");
    },
  });

  async function formPost(formData: FormData) {
    const turnstileToken = (formData?.get("cf-turnstile-response") as string) || undefined;
    const rawFormData: FormModel = {
      name: formData?.get("your-name") as string,
      email: formData?.get("your-email") as string,
      subject: formData?.get("your-subject") as string,
      message: formData?.get("your-message") as string,
      turnstileToken,
    };
    sendMutation.mutate(rawFormData);
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
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
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0, duration: 0.4 }}
                >
                  <label>
                    {" "}
                    Tên bạn
                    <br />
                    <span data-name="your-name">
                      <input size={40} maxLength={400} required type="text" name="your-name" />
                    </span>{" "}
                  </label>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <label>
                    {" "}
                    Email
                    <br />
                    <span data-name="your-email">
                      <input size={40} maxLength={400} type="email" name="your-email" required />
                    </span>{" "}
                  </label>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <label>
                    {" "}
                    Tiêu đề (Tuỳ chọn)
                    <br />
                    <span data-name="your-subject">
                      <input size={40} maxLength={400} aria-invalid="false" type="text" name="your-subject" />
                    </span>{" "}
                  </label>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <label>
                    Nội dung
                    <br />
                    <span data-name="your-message">
                      <textarea name="your-message" rows={5} maxLength={2000} />
                    </span>
                  </label>
                </motion.p>
                <div className="cf-turnstile" data-sitekey="0x4AAAAAACWOggNrwNIc73c4"></div>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "tween", duration: 0.1 }}
                >
                  {sendMutation?.isPending ? "Đang gửi..." : "Gửi ngay"}
                </motion.button>

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
    </motion.div>
  );
};

export default Contact;
