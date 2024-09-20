import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { POST } from "../../services/http.client";
const { Option } = Select;

export const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values: unknown) => {
    console.log("Received values of form: ", values);
    try {
      const data = await POST("register", {
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const result = await data.json();
      if (result) {
        navigate("/");
      }
    } catch (e: unknown) {
      const error = e as { statusText: string };
      notification.error({ message: error.statusText });
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="img-container">
      <div className="form-container">
        <Form
          {...layout}
          form={form}
          labelWrap
          name="register"
          onFinish={onFinish}
          initialValues={{}}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="First Name"
            tooltip="Fill the input with your First Name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            tooltip="Fill the input with your Last Name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={"+04"}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please insert your address",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: true,
                message: "Please enter your age!",
              },
            ]}
          >
            <InputNumber min={18} max={99} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "24px" }}
          >
            <Button type="primary" htmlType="submit">
              Register
            </Button>

            <Button
              type="default"
              htmlType="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Register;
