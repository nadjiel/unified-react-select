import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Select from "../../select";
import { createOption, search } from "../../select/lib";
import { delay } from "../lib";
import authors from "./data.json";
import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import type { DefaultGroup, DefaultOption } from "../../select/types";

async function loadAuthors(inputValue: string) {
  return delay(Promise.resolve(
    authors.filter(a => search(a.name, inputValue))
  ), 1000);
}

async function loadAuthor(id: string) {
  return delay(Promise.resolve(
    authors.find(a => a.id.toString() === id)!
  ), 4000);
}

async function createAuthor(inputValue: string) {
  await delay(Promise.resolve(authors.push({
    id: authors.length + 1,
    name: inputValue,
    birthDate: "",
    deathDate: "",
    biography: ""
  })), 2000);
}

function authorToOption(author: Author) {
  return createOption(author.name, author.id.toString());
}

const Schema = z.object({
  id: z
    .string()
    .optional(),
  name: z
    .string()
    .min(1, "Name is mandatory!")
    .max(20, "Name too long!"),
  description: z
    .string()
    .max(50, "Name too long!")
    .optional(),
  publicationDate: z.string(),
  authorId: z
    .string()
    .optional(),
  rating: z
    .coerce
    .number(),
});

interface Author {
  id: number;
  name: string;
  birthDate: string;
  deathDate: string;
  biography: string;
}

interface Book {
  id: string;
  name: string;
  description: string;
  publicationDate: string;
  authorId: string;
  rating: number;
}

type SchemaInput = z.input<typeof Schema>;

type SchemaOutput = z.output<typeof Schema>;

interface Props {
  data?: Book;
  onValid: SubmitHandler<SchemaOutput>;
  onInvalid?: SubmitErrorHandler<SchemaInput>;
}

function Form({
  data,
  onValid,
  onInvalid,
}: Props) {
  const form = useForm<SchemaInput, unknown, SchemaOutput>({
    resolver: zodResolver(Schema),
    defaultValues: data,
  });

  return (
    <form onSubmit={form.handleSubmit(onValid, onInvalid)}>
      <h1>Create a new book!</h1>
      <input
        id="id"
        type="hidden"
        {...form.register("id")}
      />
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...form.register("name")}
        />
        <span>{form.formState.errors.name?.message}</span>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...form.register("description")}
        />
        <span>{form.formState.errors.description?.message}</span>
      </div>
      <div>
        <label htmlFor="publicationDate">Publication</label>
        <input
          id="publicationDate"
          type="date"
          {...form.register("publicationDate")}
        />
        <span>{form.formState.errors.publicationDate?.message}</span>
      </div>
      <div>
        <label htmlFor="authorId">Author</label>
        <Controller
          control={form.control}
          name="authorId"
          render={({ field }) => (
            <Select<DefaultOption, false, DefaultGroup>
              inputId="authorId"
              loadOptions={inputValue => loadAuthors(inputValue).then(res => res.map(authorToOption))}
              onCreateOption={createAuthor}
              disabled={field.disabled}
              name={field.name}
              onBlur={field.onBlur}
              ref={field.ref}
              onChange={newValue => field.onChange(newValue?.value)}
              loadDefaultValue={field.value ? (() => loadAuthor(field.value!).then(authorToOption)) : undefined}
            />
          )}
        />
        <span>{form.formState.errors.authorId?.message}</span>
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          type="number"
          step={0.1}
          {...form.register("rating")}
        />
        <span>{form.formState.errors.rating?.message}</span>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default function FormExample() {
  const book: Book = {
    id: "2",
    name: "Echoes of Silence",
    description: "A gripping story of survival and hope.",
    publicationDate: "2015-11-10",
    authorId: "3",
    rating: 4.5
  };

  return <Form data={book} onValid={console.log} onInvalid={console.error} />;
}
