import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const FormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
      display: flex;
      justify-content: flex-end;
      gap: 1.2rem;
    }
  `;

  const Label = styled.label`
    font-weight: 500;
  `;

  const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
  `;

  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (error) => {
      toast.error("Failed to create cabin: " + error.message);
    },
  });

  /*
  - useForm is a React Hook Form function provides various utilities for managing form state and validation.
  - It returns an object with methods like register, handleSubmit, and errors.
  - getValues	Retrieves the current values of the form fields.
- formState	Holds the form state, including validation errors.
  */
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  /**
   errors = {
  name: { message: "This field is required" },
  email: { message: "Invalid email address" },
};
   */
  const { errors } = formState;

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  function onError(errors) {}
  return (
    /* 
  - handleSubmit is a function that handles form submission and validation 
- When the form is submitted, handleSubmit first gathers all form data and validates them
- If the validation passes(If the form is valid), it calls the onSubmit function with the form data.
- If validation fails, it prevents form submission and manages errors by calling the onError function with errors as an object.
    */
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <label htmlFor="name">Cabin name</label>
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          /* 
  - register is a function that registers input fields to the form state
  - It is provided by React Hook Form (useForm).
  - It registers an input field under the key "name".
  - The second argument { required: "This field is required" } adds validation rules.
  - The required property ensures that the field must be filled.
  - If left empty, the error message "This field is required" is stored in the errors object.
   - The spread operator (...) spreads the returned object from register() into the input component.
  - It returns an object with event handlers and attributes, similar to:
{
  name: "name",          // Input's name attribute
  ref: (ref) => {...},   // Registers ref for focus management
  onChange: (event) => {...}, // Handles state updates
  onBlur: (event) => {...},   // Handles validation on blur
}
  - By using {...register(...)}, we pass all these properties to the <input> field automatically
    */
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <label htmlFor="maxCapacity">Maximum capacity</label>
        <Input
          disabled={isCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should at least be 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <label htmlFor="regularPrice">Regular price</label>
        <Input
          disabled={isCreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <label htmlFor="discount">Discount</label>
        <Input
          disabled={isCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            /**
- React Hook Form allows custom validation using the validate property inside register().
It defines a function that receives the current input value (value) and returns:
    - true → if the validation passes.
    - A string (error message) → if the validation fails.
- getValues() is a function from useForm() that retrieves the current values of form fields.
             */
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <label htmlFor="description">Description for website</label>
        <Textarea
          disabled={isCreating}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <label htmlFor="image">Cabin photo</label>
        <FileInput
          disabled={isCreating}
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
        {errors?.secondary?.message && (
          <Error>{errors.secondary.message}</Error>
        )}
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
