export const stepForm = [
  {
    step: 1,
    title: "stepForm.step1.title",
    fields: [
      {
        id: '1',
        name: "username",
        type: "text",
        label: "stepForm.step1.fields.username.label",
        rules: [{ required: true, message: "stepForm.step1.fields.username.message" }],
      },
      {
        id: '2',
        name: "email",
        type: "email",
        label: "stepForm.step1.fields.email.label",
        rules: [
          { required: true, message: "stepForm.step1.fields.email.required" },
          { type: "email", message: "stepForm.step1.fields.email.invalid" },
        ],
      },
    ],
  },
  {
    step: 2,
    title: "stepForm.step2.title",
    fields: [
      {
        id: '1',
        name: "address",
        type: "text",
        label: "stepForm.step2.fields.address.label",
        rules: [{ required: true, message: "stepForm.step2.fields.address.message" }],
      },
      {
        id: '2',
        name: "city",
        type: "text",
        label: "stepForm.step2.fields.city.label",
        rules: [{ required: true, message: "stepForm.step2.fields.city.message" }],
      },
    ],
  },
  {
    step: 3,
    title: "stepForm.step3.title",
    fields: [
      {
        id: '1',
        name: "terms",
        type: "checkbox",
        label: "stepForm.step3.fields.terms.label",
        rules: [{ required: true, message: "stepForm.step3.fields.terms.message" }],
      },
    ],
  },
];
