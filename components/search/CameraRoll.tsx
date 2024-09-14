import React, { useState, useEffect } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { Button, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Asset, getAssetsAsync } from "expo-media-library";
import { Image } from "expo-image";

const paddingFixed = 10;
const { width } = Dimensions.get("window");
const imageWidth = width / 3 - paddingFixed * 2;

const CameraRoll = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getAllAssets();
  }, []);

  const getAllAssets = async () => {
    if (!hasNextPage) return;

    const albumAssets = await getAssetsAsync({
      mediaType: "photo",
      sortBy: "creationTime",
      first: 50,
      after: endCursor || undefined,
    });

    setAssets((prevAssets) => [...prevAssets, ...albumAssets.assets]);
    setHasNextPage(albumAssets.hasNextPage);
    setEndCursor(albumAssets.endCursor);
  };

  const routeToImage = (uri: string, height: number) => {
    router.push({
      pathname: "/(modals)/image",
      params: { uri, height },
    });
  };

  const renderItem = ({ item }: { item: Asset }) => {
    const aspectRatio = item.width / item.height;
    const imageHeight = imageWidth / aspectRatio;

    return (
      <TouchableOpacity
        onPress={() => routeToImage(item.uri, item.height)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Image
          source={item.uri}
          style={{
            width: "80%",
            height: imageHeight,
            borderWidth: 1,
            borderColor: "black",
            marginVertical: paddingFixed,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={assets}
      numColumns={2}
      keyExtractor={(item, index) => item.id.toString() + index}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingTop: 50,
      }}
      columnWrapperStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      ListHeaderComponent={
        <Stack.Screen
          options={{
            title: "Your Library",
            headerTransparent: true,
            headerBlurEffect: "dark",
            headerLeft: () => (
              <Link href={"/(modals)CameraRoll"} asChild>
                <Button title="Cancel" />
              </Link>
            ),
          }}
        />
      }
      onEndReached={getAllAssets}
      onEndReachedThreshold={0.5}
    />
  );
};

export default CameraRoll;
