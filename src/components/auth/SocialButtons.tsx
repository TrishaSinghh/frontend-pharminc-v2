import { Button } from "../ui/button";

export function SocialAuthButtons() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="outline" type="button" className="w-full">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.545 0 2.939.58 4.02 1.525L19 5.009A10.14 10.14 0 0012.545 2C6.795 2 2 6.795 2 12.546c0 5.752 4.795 10.546 10.545 10.546 6.066 0 10.06-4.267 10.06-10.272 0-.544-.044-1.053-.13-1.545h-9.93z"></path>
          </svg>
          Google
        </Button>
        <Button variant="outline" type="button" className="w-full">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.95263 22H14.0526C14.5711 22 15 21.5711 15 21.0526V14.211H17.8801C18.3475 14.211 18.7418 13.863 18.8001 13.3995L18.9695 11.5995C19.0391 11.042 18.6075 10.5263 18.0495 10.5263H15V8.21053C15 7.51216 15.5121 7.00001 16.2105 7.00001H18.1579C18.6764 7.00001 19.1053 6.57106 19.1053 6.05264V4.59106C19.1053 4.10264 18.7354 3.6926 18.2532 3.6158C17.25 3.45528 16.2337 3.37553 15.2159 3.37659C12.0317 3.37659 9.95263 5.45569 9.95263 8.63985V10.5263H7.10527C6.5868 10.5263 6.15789 10.9552 6.15789 11.4737V13.2631C6.15789 13.7816 6.5868 14.2105 7.10527 14.2105H9.95263V21.0526C9.95263 21.5711 10.3816 22 10.9 22"></path>
          </svg>
          Facebook
        </Button>
      </div>
    </div>
  );
}
