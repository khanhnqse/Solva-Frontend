import React, { useState } from 'react';
import { Button, Input, message, Spin, Form } from 'antd';
import {
  FacebookOutlined,
  GoogleOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import logo from '../../assets/logo-removebg-preview.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://jobeewepappapi20241008011108.azurewebsites.net/api/Account/login',
        {
          email: values.email,
          passwordHash: values.password,
        }
      );
      console.log(response.data);
      // Handle successful login
      message.success('Login successful!');
      // Call the login function from AuthContext
      login();
      // Redirect to landing page or any other page
      navigate('/landing-page');
    } catch (error) {
      // Handle login error
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white shadow-lg rounded-lg flex overflow-hidden"
        style={{ width: '900px' }}
      >
        {/* Left section (Login form) */}
        <div className="w-2/3 p-10">
          <div className="text-left mb-8">
            <img src={logo} alt="Logo" className="h-12 mb-4" />{' '}
            {/* Replace with your logo */}
            <h2 className="text-3xl font-bold mb-2">Login to Create your CV</h2>
            <p className="text-gray-500">Login using social networks</p>
          </div>

          {/* Social login buttons */}
          <div className="flex space-x-4 mb-6">
            <Button
              icon={<FacebookOutlined />}
              className="w-1/3 flex items-center justify-center"
              style={{ backgroundColor: '#3b5998', color: '#fff' }}
            >
              Facebook
            </Button>
            <Button
              icon={<GoogleOutlined />}
              className="w-1/3 flex items-center justify-center"
              style={{ backgroundColor: '#db4437', color: '#fff' }}
            >
              Google
            </Button>
            <Button
              icon={<LinkedinOutlined />}
              className="w-1/3 flex items-center justify-center"
              style={{ backgroundColor: '#0077b5', color: '#fff' }}
            >
              LinkedIn
            </Button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Email and Password Input */}
          <Form
            name="login"
            layout="vertical"
            onFinish={handleLogin}
            className="space-y-4"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                placeholder="Email"
                size="large"
                className="p-2 rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                placeholder="Password"
                size="large"
                className="p-2 rounded-md"
              />
            </Form.Item>

            {/* Sign In Button */}
            <Form.Item>
              <Button
                type="primary"
                size="large"
                className="w-full mt-6 bg-gradient-to-r from-[#3B7B7A] to-teal-500 "
                htmlType="submit"
                loading={loading}
              >
                {loading ? <Spin /> : 'Sign In'}
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Right section (Sign up prompt) */}
        <div className="w-1/3 bg-gradient-to-r from-[#3B7B7A] to-teal-500 p-10 text-white text-center flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">New Here?</h2>
          <p className="mb-6">
            Sign up and discover a great amount of new opportunities!
          </p>
          <Link to="/register">
            <Button
              type="ghost"
              size="large"
              className="bg-white text-teal-500 font-semibold"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;