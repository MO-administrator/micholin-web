// Generated by Xata Codegen 0.30.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "Comments",
    checkConstraints: {
      Comments_xata_id_length_xata_id: {
        name: "Comments_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
      Comments_xata_string_length_blog_id: {
        name: "Comments_xata_string_length_blog_id",
        columns: ["blog_id"],
        definition: "CHECK ((length(blog_id) <= 2048))",
      },
      Comments_xata_text_length_message: {
        name: "Comments_xata_text_length_message",
        columns: ["message"],
        definition: "CHECK ((octet_length(message) <= 204800))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_Comments_xata_id_key: {
        name: "_pgroll_new_Comments_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "blog_id",
        type: "string",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: '{"xata.type":"string"}',
      },
      {
        name: "message",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.type":"text"}',
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "Likes",
    checkConstraints: {
      Likes_xata_id_length_xata_id: {
        name: "Likes_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
      Likes_xata_string_length_blog_id: {
        name: "Likes_xata_string_length_blog_id",
        columns: ["blog_id"],
        definition: "CHECK ((length(blog_id) <= 2048))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      Likes__pgroll_new_blog_id_key: {
        name: "Likes__pgroll_new_blog_id_key",
        columns: ["blog_id"],
      },
      _pgroll_new_Likes_xata_id_key: {
        name: "_pgroll_new_Likes_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "blog_id",
        type: "string",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: '{"xata.type":"string"}',
      },
      {
        name: "likes",
        type: "int",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "Subscribers",
    checkConstraints: {
      Subscribers_xata_email_length_email: {
        name: "Subscribers_xata_email_length_email",
        columns: ["email"],
        definition: "CHECK ((length(email) <= 2048))",
      },
      Subscribers_xata_id_length_xata_id: {
        name: "Subscribers_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
      Subscribers_xata_string_length_name: {
        name: "Subscribers_xata_string_length_name",
        columns: ["name"],
        definition: "CHECK ((length(name) <= 2048))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      Subscribers__pgroll_new_email_key: {
        name: "Subscribers__pgroll_new_email_key",
        columns: ["email"],
      },
      _pgroll_new_Subscribers_xata_id_key: {
        name: "_pgroll_new_Subscribers_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "email",
        type: "email",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: '{"xata.type":"email"}',
      },
      {
        name: "name",
        type: "string",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.type":"string"}',
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Comments = InferredTypes["Comments"];
export type CommentsRecord = Comments & XataRecord;

export type Likes = InferredTypes["Likes"];
export type LikesRecord = Likes & XataRecord;

export type Subscribers = InferredTypes["Subscribers"];
export type SubscribersRecord = Subscribers & XataRecord;

export type DatabaseSchema = {
  Comments: CommentsRecord;
  Likes: LikesRecord;
  Subscribers: SubscribersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Olin-Fernandes-s-workspace-enni6o.us-east-1.xata.sh/db/blogs",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
