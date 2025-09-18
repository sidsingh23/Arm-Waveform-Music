import asyncio
import websockets
import json
import cv2
import numpy as np
import mediapipe as mp


mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5)

SEND_DATA = True  # False if you wanna pause

async def send_wave(websocket):
    cap = cv2.VideoCapture(0)
    smoothing = np.zeros(6)  # initial smoothing buffer

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame_rgb)

        if results.pose_landmarks and SEND_DATA:
            points = [
                results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST],
                results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW],
                results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER],
                results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER],
                results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW],
                results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST],
            ]

            y_values = np.array([(1 - p.y) * 2 - 1 for p in points])


            alpha = 0.5
            smoothing = alpha * y_values + (1 - alpha) * smoothing

            msg = json.dumps({"waveform": smoothing.tolist()})
            await websocket.send(msg)

        await asyncio.sleep(0.02)  # 50 FPS

async def main():
    async with websockets.serve(send_wave, "localhost", 8009):
        print("Server running on ws://localhost:8009")
        await asyncio.Future()  # runs until you end with ctrl+c

if __name__ == "__main__":
    asyncio.run(main())
