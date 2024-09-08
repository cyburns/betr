import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, View } from "react-native";

import {
  BarcodeScanningResult,
  CameraMode,
  CameraView,
  FlashMode,
} from "expo-camera";
import BottomRowTools from "@/components/BottomRowTools";
import MainRowActions from "@/components/MainRowActions";
import PictureView from "@/components/PictureView";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import CameraTools from "@/components/CameraTools";
import * as WebBrowser from "expo-web-browser";
import QRCodeButton from "@/components/QRCodeButton";
import VideoViewComponent from "@/components/VideoView";

const HomeScreen = () => {
  const cameraRef = useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = useState<CameraMode>("picture");
  const [cameraTorch, setCameraTorch] = useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");
  const [cameraZoom, setCameraZoom] = useState<number>(0);
  const [picture, setPicture] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [isBrowsing, setIsBrowsing] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [qrCodeDetected, setQrCodeDetected] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTakePicture = async () => {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response!.uri);
  };

  const toggleRecord = async () => {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await cameraRef.current?.recordAsync();
      setVideo(response!.uri);
    }
  };

  const handleOpenQRCode = async () => {
    setIsBrowsing(true);
    const browserResult = await WebBrowser.openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });
    if (browserResult.type === "cancel") {
      setIsBrowsing(false);
    }
  };

  const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    if (result.data) {
      setQrCodeDetected(result.data);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setQrCodeDetected("");
      }, 1000);
    }
  };

  if (isBrowsing) return <></>;
  if (picture) return <PictureView picture={picture} setPicture={setPicture} />;
  if (video) return <VideoViewComponent video={video} setVideo={setVideo} />;

  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(1000)}
      style={{ flex: 1 }}
    >
      <CameraView
        ref={cameraRef}
        style={{ flex: 1, backgroundColor: "black" }}
        facing={cameraFacing}
        mode={cameraMode}
        zoom={cameraZoom}
        enableTorch={cameraTorch}
        flash={cameraFlash}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarcodeScanned}
        onCameraReady={() => console.log("camera is ready")}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 6 }}>
            {qrCodeDetected ? (
              <QRCodeButton handleOpenQRCode={handleOpenQRCode} />
            ) : null}
            <CameraTools
              cameraZoom={cameraZoom}
              cameraFlash={cameraFlash}
              cameraTorch={cameraTorch}
              setCameraZoom={setCameraZoom}
              setCameraFacing={setCameraFacing}
              setCameraTorch={setCameraTorch}
              setCameraFlash={setCameraFlash}
            />
            <MainRowActions
              isRecording={isRecording}
              handleTakePicture={
                cameraMode === "picture" ? handleTakePicture : toggleRecord
              }
              cameraMode={cameraMode}
            />
            {/* <BottomRowTools
              cameraMode={cameraMode}
              setCameraMode={setCameraMode}
            /> */}
          </View>
        </SafeAreaView>
      </CameraView>
    </Animated.View>
  );
};

export default HomeScreen;
