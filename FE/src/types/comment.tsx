import * as Yup from 'yup';
export const formComment = Yup.object({
    comment: Yup.string().min(8, "Ít nhất 8 kí tự",
    ).required(),
});
export type FormComment = Yup.InferType<typeof formComment>;
