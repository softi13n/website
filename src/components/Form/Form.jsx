import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { StaticImage } from "gatsby-plugin-image";
import cn from "classnames";
import { navigationItems } from "../../const";

import "./Form.scss";

const initialFormData = {
  name: "",
  contact: "",
  message: "",
};

export const Form = () => {
  const intl = useIntl();

  const [formData, setFormData] = useState(initialFormData);

  const isButtonEnabled = Boolean(formData.contact);

  const successMessage = intl.formatMessage({
    id: "form-success",
    defaultMessage:
      "Спасибо за ваше обращение! Мы получили ваше сообщение и свяжемся с вами в ближайшее время.",
  });

  const errorMessage = intl.formatMessage({
    id: "form-error",
    defaultMessage:
      "Что-то пошло не так, попробуйте еще раз немного позже или свяжитесь другим удобным способом.",
  });

  const onSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const url = "https://softi13n.com/backend/form";
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
      //   mode: "cors", // no-cors, *cors, same-origin
      //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //   credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
      //     // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      //   redirect: "follow", // manual, *follow, error
      //   referrerPolicy: "no-referrer", // no-referrer, *client
        body: JSON.stringify(formData), // body data type must match "Content-Type" header
      });

      // возможно это некорректный код, т.к. fetch асинхронный?
      if (response.status != 200) { 
        throw "response.status != 200";
      }

      alert(successMessage);
      setFormData(formData);
    } catch (error) {
      console.error(error);
      alert(errorMessage);
    }
  };

  return (
    <form
      className="form"
      onSubmit={onSubmitForm}
      id={navigationItems.CONTACTS}
    >
      <p className="form__title">
        <span className="form__title_blue">
          <FormattedMessage id="form-title-1" defaultMessage="Напишите нам" />
        </span>{" "}
        <FormattedMessage
          id="form-title-2"
          defaultMessage="о своих идеях или вопросах, и мы скоро свяжемся с вами!"
        />
      </p>
      <div className="form__content">
        <input
          value={formData.name}
          type="text"
          className="form__input"
          placeholder={intl.formatMessage({
            id: "form-name-placeholder",
            defaultMessage: "Имя",
          })}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              name: event?.target?.value || "",
            }))
          }
        />
        <input
          value={formData.contact}
          type="text"
          className="form__input"
          placeholder={intl.formatMessage({
            id: "form-contact-placeholder",
            defaultMessage: "e-mail / telegram / номер телефона",
          })}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              contact: event?.target?.value || "",
            }))
          }
        />
        <textarea
          value={formData.message}
          className="form__textarea"
          placeholder={intl.formatMessage({
            id: "form-message-placeholder",
            defaultMessage: "Ваше сообщение",
          })}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              message: event?.target?.value || "",
            }))
          }
        />
        <button
          className={cn("form__button", {
            form__button_active: isButtonEnabled,
          })}
          type="submit"
        >
          <FormattedMessage id="form-button" defaultMessage="Отправить" />
        </button>
      </div>
      <div className="form__social">
        <a className="social" href="mailto:company@softi13n.com" target="__blank">
          <StaticImage src="../../images/icon-mail.png" width={40} />
          company@softi13n.com
        </a>
        <a className="social" href="https://t.me/softi13n" target="__blank">
          <StaticImage src="../../images/icon-tg.png" width={40} />
          t.me/softi13n
        </a>
        <a className="social" href="https://wa.me/79939190088" target="__blank">
          <StaticImage src="../../images/icon-wa.png" width={40} />
          +7 (993) 919-00-88
        </a>
      </div>
    </form>
  );
};
