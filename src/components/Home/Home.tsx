"use client";

import { getInvoiceTemplatesApi, postSaveInvoiceSettingApi } from "@/_apis_";
import { IFonts, IOptionsType, ISettings } from "@/types";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { FormEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { CustomFileUpload, FormInput, FormLabel, FormSelect } from "@/shared";
import { toast } from "sonner";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import { createCustomOptions } from "@/utils";
import IFrame from "./IFrame";

const Home = () => {
  const [templates, setTemplates] = useState<IOptionsType[]>([]);
  const [fonts, setFonts] = useState<IFonts[]>([]);
  const [selectedFont, setSelectedFont] = useState<IFonts>();

  const formik = useFormik<ISettings>({
    enableReinitialize: true,
    initialValues: {
      name: "",
      details: "",
      terms: "",
      color: "#000000",
      bgColor: "transparent",
      font: "Open Sans",
      logo: null,
      template: templates[0]?.value || "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please provide a valid title"),
      template: Yup.string().required(
        "Please provide a valid setting template"
      ),
      details: Yup.string().required("Please provide valid bank details"),
      terms: Yup.string().required("Please provide valid terms"),
      bgColor: Yup.string().required("Please provide valid background color"),
      color: Yup.string().required("Please provide valid font color"),
      font: Yup.string().required("Please provide valid font"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        // Convert form values to FormData
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("template", values.template);
        formData.append("details", values.details);
        formData.append("terms", values.terms);
        formData.append("bgColor", values.bgColor);
        formData.append("color", values.color);
        formData.append("font", values.font);
        formData.append("file", values.logo as File);

        const value = await postSaveInvoiceSettingApi(formData);
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

  const selectedHtml = useMemo(
    () =>
      (templates.find((temp) => temp.value === values.template) || templates[0])
        ?.content || "",
    [templates, values.template]
  );

  const getTemplateToDisplay = useMemo(() => {
    let updatedHtml = selectedHtml;
    updatedHtml = updatedHtml.replace(
      "<style>",
      `<style>
        @font-face {
          font-family: ${selectedFont?.family || values.font};
          src: url(${selectedFont?.menu || ""}) format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      `
    );
    updatedHtml = updatedHtml.replace(
      "{{.BrandLogo}}",
      values.logo ? URL.createObjectURL(values.logo) : ""
    );
    updatedHtml = updatedHtml.replace("{{.Terms}}", values.terms);
    updatedHtml = updatedHtml.replace("{{.Title}}", values.name);
    updatedHtml = updatedHtml.replace("{{.Content}}", values.details);
    updatedHtml = updatedHtml.replace("{{.FontStyle}}", values.font);
    updatedHtml = updatedHtml.replace("{{.FontColor}}", values.color);
    updatedHtml = updatedHtml.replace("{{.BackgroundColor}}", values.bgColor);
    return updatedHtml;
  }, [
    selectedFont,
    selectedHtml,
    values.logo,
    values.terms,
    values.name,
    values.details,
    values.font,
    values.color,
    values.bgColor,
  ]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    handleSubmit(e);
  };

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

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${
          process.env.NEXT_PUBLIC_FT || ""
        }&sort=popularity`
      )
      .then((response) => {
        const fontFamilies = response.data.items as IFonts[];
        setFonts(fontFamilies);
        setSelectedFont(fontFamilies[0]);
        setFieldValue("font", fontFamilies[0].family);
      })
      .catch((error) => {});
  }, [setFieldValue]);

  useEffect(() => {
    fetch("/png/logo-placeholder.png")
      .then((response) => response.blob())
      .then((blob) => {
        // Create a File object from the blob
        const file = new File([blob], "banner.png", { type: "image/png" });

        setFieldValue("logo", file);
      })
      .catch((error) => {});
  }, [setFieldValue, templates]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-5 gap-5 lg:gap-10 w-full min-h-screen">
      <section className="bg-[var(--green-a1)] col-span-1 md:col-span-2 p-5 lg:p-10 lg:py-5 md:h-screen overflow-y-auto no-scrollbar">
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
                    selectedFile={values.logo}
                    handleSelectedFile={(file) => setFieldValue("logo", file)}
                  />
                </div>

                <div className="flex flex-col space-y-6 border border-[var(--green-3)] rounded-lg p-5 bg-[var(--green-1)]">
                  <FormInput
                    id="name"
                    label="Business Name"
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
                  <div className="flex flex-col space-y-2">
                    <FormLabel label="Choose Font Color" />
                    <HexColorPicker
                      color={values.color}
                      onChange={(color) => setFieldValue("color", color)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <FormLabel label="Choose Background Color" />
                    <HexColorPicker
                      color={values.bgColor}
                      onChange={(color) => setFieldValue("bgColor", color)}
                    />
                  </div>
                  <FormSelect
                    id="font"
                    options={createCustomOptions(fonts, "family", "family")}
                    label="Choose font"
                    {...formik.getFieldProps("font")}
                    error={formik.errors.font as string}
                    touched={formik.touched.font as boolean}
                    onChange={(event) => {
                      setFieldValue("font", event.target.value);
                      setSelectedFont(
                        fonts.find((font) => font.family === event.target.value)
                      );
                    }}
                  />
                  <FormSelect
                    id="template"
                    options={templates}
                    label="Select template"
                    {...formik.getFieldProps("template")}
                    error={formik.errors.template as string}
                    touched={formik.touched.template as boolean}
                  />
                </div>

                <div className="flex items-center gap-5">
                  <button
                    disabled={isSubmitting}
                    type="button"
                    className="rounded-lg bg-gray-200 text-sm min-w-[70px] min-h-8 font-medium flex items-center justify-center px-3"
                    onClick={handleReset}
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
        <h2 className="font-bold text-2xl">Preview</h2>

        <IFrame
          srcDoc={getTemplateToDisplay}
          className="h-full w-full min-h-[80vh] max-w-[100vw]"
        />
      </section>
    </main>
  );
};

export default Home;
