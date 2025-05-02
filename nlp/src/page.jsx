"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import RecentChats from "./components/RecentChats"

const Page = () => {
  const [file, setFile] = useState(null)
  const [text, setText] = useState("")
  const [prediction, setPrediction] = useState(null)
  const [accuracy, setAccuracy] = useState(null)
  const [showAccuracy, setShowAccuracy] = useState(false)
  const [processedText, setProcessedText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    setFile(file)
    
    // If it's an image, read it and convert to base64
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        setFile({
          ...file,
          preview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
  
    try {
      const formData = {
        text: text
      }

      // Add file data if present
      if (file) {
        if (file.type.startsWith('image/')) {
          formData.image = file.preview
        } else {
          const reader = new FileReader()
          reader.onload = () => {
            formData.file = reader.result
            formData.fileType = file.type
          }
          reader.readAsDataURL(file)
        }
      }

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
  
      if (!response.ok) {
        throw new Error("Prediction failed")
      }
  
      const data = await response.json()
      setPrediction(data.prediction === 1 ? "Fraudulent" : "Not Fraudulent")
      setAccuracy(data.accuracy)
      setProcessedText(data.processed_text)
      setShowAccuracy(true)
  
    } catch (error) {
      console.error("Prediction error:", error)
      alert("Error during prediction. Please check if the ML server is running and try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClear = () => {
    setFile(null)
    setText("")
    setPrediction(null)
    setAccuracy(null)
    setShowAccuracy(false)
    setProcessedText("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-16"
    >
      <div className="min-h-screen bg-[#fdfbf6]">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 mr-64"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-[#2d2d2d]">Email Security Check</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-[#5c8d63] bg-[#5c8d63] bg-opacity-10" : "border-gray-300"}`}
              >
                <input {...getInputProps()} />
                {file ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <p className="text-[#5c8d63]">File selected: {file.name}</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                    {file.type.startsWith('image/') && file.preview && (
                      <div className="max-w-xs mx-auto">
                        <img 
                          src={file.preview} 
                          alt="Preview" 
                          className="max-h-40 mx-auto rounded-lg shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <p>{isDragActive ? "Drop the file here" : "Drag 'n' drop an image, PDF, or DOCX file here, or click to select a file"}</p>
                )}
              </div>

              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5c8d63] focus:border-transparent resize-none"
                />
                {text && (
                  <button
                    type="button"
                    onClick={() => setText("")}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`bg-[#5c8d63] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#4a7150] transition-colors ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? 'Processing...' : 'Submit'}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {showAccuracy && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 p-6 bg-[#f8f9fa] rounded-lg border border-gray-200"
                >
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold text-[#2d2d2d]">
                      Prediction: <span className={prediction === "Fraudulent" ? "text-red-600" : "text-[#5c8d63]"}>{prediction}</span>
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Model Confidence</span>
                        <span className="font-bold text-[#5c8d63]">
                          {(accuracy * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${accuracy * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-[#5c8d63]"
                        />
                      </div>
                    </div>

                    {processedText && (
                      <div className="mt-4 text-left">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">Processed Text:</h4>
                        <p className="text-sm text-gray-500 bg-white p-3 rounded border border-gray-200">
                          {processedText}
                        </p>
                      </div>
                    )}

                    <p className="text-sm text-gray-500 mt-2">
                      This prediction is based on our trained model with {Math.round(accuracy * 100)}% accuracy on test data.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <RecentChats />
        </div>
      </div>
    </motion.div>
  )
}

export default Page

