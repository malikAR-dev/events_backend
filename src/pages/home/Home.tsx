import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./style.css";
import axios from "axios";

export enum EventType {
  EidAlFitr = "Eid-al-Fitr",
}

const Home: React.FC = () => {
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [message, setMessage] = useState("");
  const [BgImage, setBGImage] = useState("");
  const [enterMessage, setEnterMessage] = useState(false);

  const [messages, setMessages] = useState([]);
  const [themes, setThemes] = useState([]);
  const [link, setLink] = useState("");

  const getMessage = () => {
    axios.get("http://localhost:8080/messages").then((res) => {
      setMessages(res.data);
    });
  };

  const getThemes = () => {
    axios.get("http://localhost:8080/themes").then((res) => {
      setThemes(res.data);
    });
  };

  const postOccasion = () => {
    axios
      .post("http://localhost:8080/occasions", {
        name,
        event,
        message,
        theme: BgImage,
      })
      .then((res) => {
        setLink(res.data.generatedLink);
      });
  };

  useEffect(() => {
    getMessage();
    getThemes();
  }, []);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      postOccasion();
      event.preventDefault();
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Form
      className="root"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div className="form">
        <div className="formField">
          <Form.Label>Enter Your Name</Form.Label>
          <Form.Control
            required
            maxLength={20}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="formField">
          <Form.Label>Select Event</Form.Label>
          <Form.Select
            required
            disabled={name ? false : true}
            onChange={(e) => setEvent(e.target.value)}
          >
            <option selected disabled value="">
              Select Event
            </option>
            <option value="Eid-al-Fitr">Eid-al-Fitr</option>
            <option disabled>14th August (Coming Soon)</option>
            <option disabled>Birthday (Coming Soon)</option>
          </Form.Select>
        </div>

        <div className="formField">
          <Form.Label>Select Message</Form.Label>
          <Form.Select
            required
            disabled={event ? false : true}
            onChange={(e) => {
              setMessage(e.target.value === "Custom" ? "" : e.target.value);
              setEnterMessage(e.target.value === "Custom" ? true : false);
            }}
          >
            <option selected disabled value="">
              Select Message
            </option>
            {messages.length &&
              messages.map(
                (message: any) =>
                  message.type === event && (
                    <option value={message.message}>{message.message}</option>
                  )
              )}
            <option value="Custom">Custom Message</option>
          </Form.Select>
        </div>

        {enterMessage && (
          <div className="formField">
            <Form.Label>Enter Your Message</Form.Label>
            <Form.Control
              required
              maxLength={300}
              type="text"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        )}

        <div className="formField">
          <Form.Label>Select Background Theme</Form.Label>
          <Form.Select
            required
            disabled={message ? false : true}
            onChange={(e) => setBGImage(e.target.value)}
          >
            <option selected disabled value="">
              Select Background Theme
            </option>
            {themes.length &&
              themes.map(
                (theme: any) =>
                  theme.type === event && (
                    <option value={theme.url}>{theme.name}</option>
                  )
              )}
          </Form.Select>
        </div>

        {BgImage && (
          <div
            className="BGImage"
            style={{
              backgroundImage: `url(${BgImage})`,
            }}
          >
            <div className="customMessage">
              <p>{message}</p>
              <h6>From {name}</h6>
            </div>
          </div>
        )}

        <div className="button">
          <Button type="submit">Generate Link</Button>
        </div>

        {link && (
          <div className="copyLink">
            <a href={link}>{link}</a>
            <CopyToClipboard
              text={link}
              options={{
                debug: true,
                message: "message",
                format: "text/plain",
              }}
            >
              <Button className="copyButton">Copy Link</Button>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </Form>
  );
};

export default Home;
