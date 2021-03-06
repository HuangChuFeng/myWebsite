import { toast } from "react-toastify";
import React from 'react'
import LoginForm from '../containers/loginToast';

const CREDENTIALS = process.env.ORIGIN ? "include" : "same-origin";

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export const get = async (url, params) => {
  if(params) {
    url += `?${serialize(params)}`;
  }
  try {
    var result = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: CREDENTIALS
    });
    const data = await result.json();
    if (data.resCode === 500) {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      if (data.resCode === 401) {
        console.log("USER_INVALID");
        return;
      }
      throw new Error(data.message);
    }
    return {
      data
    };
  } catch (e) {
    return {
      code: -2,
      message: e.message
    };
  }
};

export const post = async (url, body) => {
  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      credentials: CREDENTIALS
    });
    const data = await result.json();
    if (data.resCode !== 200) {
      if (data.resCode === 401) {
        console.log("USER_INVALID");
        toast(<LoginForm />,{
          autoClose: false,
          closeOnClick: false,
          draggable: false,
        });
      } else {
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      throw new Error(data.message);
    }
    return {
      data
    };
  } catch (e) {
    return {
      message: e.message,
    };
  }
};

export const formPost = async (url, formData) => {
  try {
    var result = await fetch(url, {
      method: "POST",
      body: formData
    });
    const data = await result.json();
    if (data.resCode === 500) {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      throw new Error(data.message);
    }
    return {
      data
    };
  } catch (e) {
    return {
      code: -2,
      message: "未知错误"
    };
  }
};