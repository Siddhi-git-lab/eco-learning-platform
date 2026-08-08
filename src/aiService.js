// src/aiService.js

export async function verifyPhotoWithAI(imageFile, taskDescription) {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("task_description", taskDescription);

  try {
    const response = await fetch("http://localhost:8000/verify-photo", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Server error during photo verification.");
    }

    const data = await response.json();
    return data; // Returns { status, confidence_score, is_match, reasoning }
  } catch (error) {
    console.error("Error connecting to Python verification backend:", error);
    throw error;
  }
}