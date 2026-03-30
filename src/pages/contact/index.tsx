import { motion } from "motion/react";
import { ToastContainer, toast } from "react-toastify";
import { Mail, Phone } from "lucide-react";
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
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const inputClass =
  "w-full bg-box border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40 placeholder:text-foreground/30 transition-colors";

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
    const turnstileToken =
      (formData?.get("cf-turnstile-response") as string) || undefined;
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
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <PageLayout title={title}>
        <article className="prose dark:prose-invert max-w-none">
          {/* Featured image */}
          <div className="mb-8 -mx-4 lg:-mx-8">
            <img
              width="100%"
              height="510"
              src={contact}
              alt="Blog of Tuan"
              className="w-full h-48 sm:h-64 object-cover"
            />
          </div>

         <header className="border-b border-border">
            <h1>{title}</h1>
          </header>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <p>
              Nếu bạn có bất kỳ thắc mắc nào về blog hoặc các trang web nói
              chung, xin đừng ngần ngại liên hệ với tôi. Nếu bạn có một câu hỏi
              kỹ thuật, hãy chắc chắn để bao gồm càng nhiều chi tiết càng tốt để
              tôi có thể cung cấp sự hỗ trợ tốt nhất cho bạn. Nếu bạn muốn tôi
              thiết kế website hay cài đặt blog của bạn, hãy liên hệ với tôi.
              <br />
              Tôi trả lời cho tất cả các email phản hồi.{" "}
              <span className="inline-flex items-center gap-1">
                <Mail size={14} /> tuanitpro@gmail.com
              </span>{" "}
              hoặc:{" "}
              <span className="inline-flex items-center gap-1">
                <Phone size={14} /> 097 6060 432
              </span>
            </p>
          </div>

          <hr className="border-border mb-8" />

          {/* Contact form */}
          <div className="relative">
            <form action={formPost} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.4 }}
              >
                <label className="block text-sm font-medium text-foreground mb-1">
                  Tên bạn
                </label>
                <input
                  size={40}
                  maxLength={400}
                  required
                  type="text"
                  name="your-name"
                  className={inputClass}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email
                </label>
                <input
                  size={40}
                  maxLength={400}
                  type="email"
                  name="your-email"
                  required
                  className={inputClass}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <label className="block text-sm font-medium text-foreground mb-1">
                  Tiêu đề{" "}
                  <span className="text-foreground/40 font-normal">
                    (Tuỳ chọn)
                  </span>
                </label>
                <input
                  size={40}
                  maxLength={400}
                  type="text"
                  name="your-subject"
                  className={inputClass}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nội dung
                </label>
                <textarea
                  name="your-message"
                  rows={5}
                  maxLength={2000}
                  className={`${inputClass} resize-none`}
                />
              </motion.div>

              <div
                className="cf-turnstile"
                data-sitekey="0x4AAAAAACWOggNrwNIc73c4"
              />

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                transition={{ type: "tween", duration: 0.1 }}
                className="px-6 py-2.5 bg-foreground text-background text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                disabled={sendMutation?.isPending}
              >
                {sendMutation?.isPending ? "Đang gửi..." : "Gửi ngay"}
              </motion.button>
            </form>

            {sendMutation?.isPending && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 z-10 cursor-wait">
                <Loader />
              </div>
            )}
          </div>
        </article>
        <ToastContainer />
      </PageLayout>
    </motion.div>
  );
};

export default Contact;
