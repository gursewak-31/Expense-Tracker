import "./pageLoader.css";

export default function PageLoader(){
    return(
        <div className="h-screen w-full bg-gray-950 flex p-2 justify-center items-center">
            <div>
                <div className="spinner"></div>
                <span className="text-white">Loading...</span>
            </div>
        </div>
    )
}