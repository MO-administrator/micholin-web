type FormProps = {
  name: string;
  title: string;
  netlify: boolean;
};
type FieldProps = {
  type: "email" | "text" | "password" | "textarea";
  name: string;
  label: string;
  required: boolean;
};

export const formMap = new Map([
  [
    "contact",
    {
      props: {
        name: "contact v1",
        title: "Contact Form",
        netlify: true,
      } as FormProps,
      fields: [
        {
          type: "email",
          name: "email",
          label: "Email",
          required: true,
        },
        {
          type: "text",
          name: "name",
          label: "Name",
          required: false,
        },
        {
          type: "textarea",
          name: "message",
          label: "Message",
          required: true,
        },
      ] as FieldProps[],
    },
  ],
]);
