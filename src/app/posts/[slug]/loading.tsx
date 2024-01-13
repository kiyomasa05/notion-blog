import LoadingIcons from "react-loading-icons";

export default function Loading() {
  return (
    <div className="w-full flex justify-center mt-20">
      <LoadingIcons.SpinningCircles className="w-64 h-64" />
    </div>
  );
}
