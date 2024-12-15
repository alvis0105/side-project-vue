export const stepForm = [
  {
    step: 1,
    title: "基本資訊",
    fields: [
      {
        name: "username",
        type: "text",
        label: "用戶名",
        rules: [{ required: true, message: "用戶名不可為空" }],
      },
      {
        name: "email",
        type: "email",
        label: "電子郵件",
        rules: [
          { required: true, message: "電子郵件不可為空" },
          { type: "email", message: "電子郵件格式不正確" },
        ],
      },
    ],
  },
  {
    step: 2,
    title: "地址資訊",
    fields: [
      {
        name: "address",
        type: "text",
        label: "地址",
        rules: [{ required: true, message: "地址不可為空" }],
      },
      {
        name: "city",
        type: "text",
        label: "城市",
        rules: [{ required: true, message: "城市不可為空" }],
      },
    ],
  },
  {
    step: 3,
    title: "同意條款",
    fields: [
      {
        name: "terms",
        type: "checkbox",
        label: "我同意條款",
        rules: [{ required: true, message: "請同意條款" }],
      },
    ],
  },
]
