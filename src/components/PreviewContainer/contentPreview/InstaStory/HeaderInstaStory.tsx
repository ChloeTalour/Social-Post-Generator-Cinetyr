interface HeaderInstaStoryProps {
    color: string
    date: string
    title: string
}

export default function HeaderInstaStory({ color, date, title }: HeaderInstaStoryProps) {
    return (
        <div className="z-10 w-full px-12 pt-[158px] flex flex-col">
            <div
                className="font-anton text-[108px] item-start leading-[110px]"
                style={{ color: color }}
            >
                {title}
            </div>
            <div
                className="font-glacial-indifference font-bold text-[40px] leading-none max-w-[560px] h-[80px] mt-[20px]"
                style={{ color: color }}
            >
                {date}
            </div>
        </div>
    )
}