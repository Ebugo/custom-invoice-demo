"use client";

import { getInvoiceTemplatesApi, postSaveInvoiceSettingApi } from "@/_apis_";
import { IOptionsType } from "@/types";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  FormEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CustomFileUpload, FormInput, FormSelect } from "@/shared";
import { toast } from "sonner";

const Home = () => {
  const [templates, setTemplates] = useState<IOptionsType[]>([]);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);

  const formik = useFormik<any>({
    enableReinitialize: true,
    initialValues: {
      name: "",
      details: "",
      terms: "",
      logo: "",
      template: templates[0]?.value || "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please provide a valid title"),
      template: Yup.string().required(
        "Please provide a valid setting template"
      ),
      details: Yup.string().required("Please provide valid bank details"),
      terms: Yup.string().required("Please provide valid terms"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const value = await postSaveInvoiceSettingApi({
          ...values,
        });
        if (value) {
          setSubmitting(false);

          toast.success("Setting saved successfully");
        } else {
          setSubmitting(false);
          return toast.error(
            "Failed to add setting, please try again later or contact support"
          );
        }
      } catch (error: unknown) {
        toast.error(
          "Failed to add setting, please try again later or contact support"
        );
      }

      setSubmitting(false);
    },
  });

  const { handleSubmit, setFieldValue, values, isSubmitting, handleReset } =
    formik;

  const getTemplateToDisplay = useMemo(() => {
    let updatedHtml =
      (
        templates.find((temp) => temp.value === values["template"]) ||
        templates[0]
      )?.content || "";
    updatedHtml = updatedHtml.replace(
      "{{.BrandLogo}}",
      selectedLogo ? URL.createObjectURL(selectedLogo) : ""
    );
    updatedHtml = updatedHtml.replace("{{.Terms}}", values.terms);
    updatedHtml = updatedHtml.replace("{{.Title}}", values.name);
    updatedHtml = updatedHtml.replace("{{.Content}}", values.details);
    return updatedHtml;
  }, [values, templates, selectedLogo]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    handleSubmit(e);
    // handleRemoveFile();
  };

  useEffect(() => {
    setFieldValue("logo", selectedLogo);
  }, [selectedLogo, setFieldValue]);

  useEffect(() => {
    const getTemplates = async () => {
      const responseTemplates = [];
      const res = await getInvoiceTemplatesApi();

      const data = res.data.Payload;
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          responseTemplates.push({
            label: data[i].Name,
            value: data[i].Id,
            content: atob(data[i].Content),
          });
        }
      }

      setTemplates(responseTemplates);
    };
    getTemplates();

    () => {};
  }, []);

  return (
    <main className="grid grid-cols-1 md:grid-cols-5 gap-5 lg:gap-10 w-full min-h-screen">
      <section className="bg-[var(--green-a1)] col-span-1 md:col-span-2 p-5 lg:p-10 lg:py-5">
        <FormikProvider value={formik}>
          <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="h-full">
              <div className="flex flex-col gap-3 md:gap-8">
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-2xl">Business Settings</h3>
                  <p className="text-gray-600">Customize your business</p>
                </div>
                <div>
                  <CustomFileUpload
                    selectedFile={selectedLogo}
                    setSelectedFile={setSelectedLogo}
                  />
                </div>

                <div className="flex flex-col space-y-6 border border-[var(--green-3)] rounded-lg p-5 bg-[var(--green-1)]">
                  <FormInput
                    id="name"
                    label="Title"
                    placeholder="Write something"
                    {...formik.getFieldProps("name")}
                    error={formik.errors.name as string}
                    touched={formik.touched.name as boolean}
                  />
                  <FormInput
                    id="details"
                    label="Bank Details"
                    placeholder="Write something"
                    {...formik.getFieldProps("details")}
                    error={formik.errors.details as string}
                    touched={formik.touched.details as boolean}
                  />
                  <FormInput
                    id="terms"
                    label="Terms"
                    placeholder="Write something"
                    {...formik.getFieldProps("terms")}
                    error={formik.errors.terms as string}
                    touched={formik.touched.terms as boolean}
                  />
                  <FormSelect
                    id="template"
                    options={templates}
                    label="Select template"
                    {...formik.getFieldProps("template")}
                    // onChange={(value) => setFieldValue("template", value)}
                    error={formik.errors.template as string}
                    touched={formik.touched.template as boolean}
                  />
                </div>

                <div className="flex items-center gap-5">
                  <button
                    disabled={isSubmitting}
                    type="button"
                    className="rounded-lg bg-gray-200 text-sm min-w-[70px] min-h-8 font-medium flex items-center justify-center px-3"
                    onClick={(e) => {
                      handleReset(e);
                      setSelectedLogo(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="rounded-lg text-sm bg-[var(--green-9)] text-white px-3 min-w-[70px] min-h-8 font-medium flex items-center justify-center text-[var(--green-1)]"
                  >
                    Sav{isSubmitting ? "ing" : "e"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </FormikProvider>
      </section>
      <section className="col-span-1 md:col-span-3 flex flex-col gap-10 p-5 lg:p-10 lg:py-5">
        <iframe
          className="h-full w-full min-h-[80vh] max-w-[100vw]"
          srcDoc={getTemplateToDisplay}
        ></iframe>
      </section>
    </main>
  );
};

export default Home;
