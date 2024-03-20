import Lottie from "lottie-react";
import imgAnimation from "@/assets/images/animation_llnjk5vz.json";

export const ImgLoading = () => {
	return <Lottie style={{width: '100%', height: '100%', objectFit: 'contain'}} animationData={imgAnimation} loop={true} />
}