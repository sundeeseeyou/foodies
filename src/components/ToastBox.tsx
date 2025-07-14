"use client";
import { useEffect } from "react";
import { ToastProps } from "./types";
import { HiCheckCircle } from "react-icons/hi";

export default function ToastBox({
  message,
  onClose,
  duration = 2000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="flex items-center border border-green-700 max-w-64 bg-green-100 text-green-800 p-4 rounded-lg shadow-sm fixed top-5 z-50">
      <HiCheckCircle className="w-6 h-6 mr-3" />
      <div className="text-sm">{message}</div>
    </div>
  );
}
