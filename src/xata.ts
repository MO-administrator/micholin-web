// Generated by Xata Codegen 0.30.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "posts",
    checkConstraints: {},
    foreignKeys: {
      author_link: {
        name: "author_link",
        columns: ["author"],
        referencedTable: "users",
        referencedColumns: ["xata_id"],
        onDelete: "RESTRICT",
      },
    },
    primaryKey: [],
    uniqueConstraints: {},
    columns: [
      {
        name: "author",
        type: "link",
        link: { table: "users" },
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"users"}',
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
        defaultValue: null,
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
    name: "todos",
    checkConstraints: {},
    foreignKeys: {},
    primaryKey: ["title"],
    uniqueConstraints: {},
    columns: [
      {
        name: "description",
        type: "string",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "tasks",
        type: "multiple",
        notNull: false,
        unique: false,
        defaultValue: "ARRAY[]::text[]",
        comment: "",
      },
      {
        name: "title",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "timestamp(6) with time zone",
        notNull: true,
        unique: false,
        defaultValue: "CURRENT_TIMESTAMP",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "timestamp(6) with time zone",
        notNull: true,
        unique: false,
        defaultValue: "CURRENT_TIMESTAMP",
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
    name: "users",
    checkConstraints: {},
    foreignKeys: {},
    primaryKey: ["email"],
    uniqueConstraints: {},
    columns: [
      {
        name: "email",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "hash",
        type: "string",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "timestamp(6) with time zone",
        notNull: true,
        unique: false,
        defaultValue: "CURRENT_TIMESTAMP",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "timestamp(6) with time zone",
        notNull: true,
        unique: false,
        defaultValue: "CURRENT_TIMESTAMP",
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

export type Posts = InferredTypes["posts"];
export type PostsRecord = Posts & XataRecord;

export type Todos = InferredTypes["todos"];
export type TodosRecord = Todos & XataRecord;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type DatabaseSchema = {
  posts: PostsRecord;
  todos: TodosRecord;
  users: UsersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://micholin-enni6o.eu-central-1.xata.sh/db/micholin:main",
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
