import React,{ Component} from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import ClientHeader from "../components/ClientHeader";
import ClientSidebar from "../components/ClientSidebar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
 

export default class Feedback extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    recipient: "",
    messages: [],
    users: [],
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  

  componentDidMount(){
    axios.get("/api/users/getusers")
    .then((res)=>{
      console.log("res",res)
      const users = res.data
      this.setState({users})
    })
    .catch((err)=>{
      console.log("error",err)
    })
  }
  
  handleRecipientChange = (e) => {
    this.setState(
      {
        recipient: e.target.value,
      },
      () => {
        const { recipient } = this.state;
        axios
          .get(`/messages/${recipient}`)
          .then((response) => {
            const messages = response.data;
            this.setState({ messages });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    );
  };

  handleSendMessage = () => {
    const { editorState, recipient } = this.state;
    const message = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    const timestamp = new Date().toLocaleString();
    const newMessage = {
      recipient,
      message,
      timestamp,
    };

    axios
      .post("/messages", newMessage)
      .then(() => {
        this.setState((prevState) => ({
          messages: [...prevState.messages, newMessage],
          editorState: EditorState.createEmpty(),
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { editorState, messages, users } = this.state;

    return (
      <>
        <ClientSidebar />
        <main className="main-wrap">
          <ClientHeader />

          <section className="content-main">
            <div className="content-header2">
              <h2 className="content-title">Feedback</h2>
            </div>
          </section>
          <main className="searchform">
            <div className="message-area">
              {messages.map((msg, index) => (
                <div className="messages" key={index}>
                  <span>
                    {msg.recipient}: {" "}
                    {msg.message.replace(/<\/?[^>]+(>|$)/g, "")} {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </main>
          <div className="text-area">
            <div className="input-group">
              <select id="recipient" onChange={this.handleRecipientChange}>
                {users.map((user) => {
                  return (
                    <option value={user.name} key={user._id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <Editor
              editorState={editorState}
              placeholder="Type Message Here..."
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
            />
            <button
              onClick={this.handleSendMessage}
              className="send-button"
              style={{ backgroundColor: "rgb(32, 174, 100)" }}
            >
              Send
            </button>
          </div>
        </main>
      </>
    );
  }
}