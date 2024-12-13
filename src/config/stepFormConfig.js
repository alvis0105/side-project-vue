export const stepFormConfig = [
  {
    step: 1,
    title: "基本資訊",
    fields: [
      { name: "username", type: "text", label: "用戶名", rules: [{ required: true }] },
      { name: "email", type: "email", label: "電子郵件", rules: [{ required: true, type: "email" }] },
    ],
  },
  {
    step: 2,
    title: "地址資訊",
    fields: [
      { name: "address", type: "text", label: "地址", rules: [{ required: true }] },
      { name: "city", type: "text", label: "城市", rules: [{ required: true }] },
    ],
  },
  {
    step: 3,
    title: "確認提交",
    fields: [
      { name: "terms", type: "checkbox", label: "我同意條款", rules: [{ required: true }] },
    ],
  },
]
