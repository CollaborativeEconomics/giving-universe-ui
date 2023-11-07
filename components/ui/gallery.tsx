'use client';

interface Props {
    images?: string[];
}

export default function Gallery(props: Props) {
    return (
        <div className="grid gap-1">
            <div>
                <img className="h-auto min-w-full max-w-full" src={props.images?.[0]} alt="" />
            </div>
            {getGridDiv(props.images?.slice(1))}
        </div>
    );
}

function getGridDiv(images: string[] | undefined): React.ReactElement {
    if (!images) {
        return <div />
    }
    // must contain at least three images to fill to width
    let gridClass;
    if (images.length <= 3) {
        gridClass = "grid grid-cols-3 gap-1";
    } else {
        gridClass = "grid grid-cols-4 gap-1";
    }
    return (
        <div className={gridClass}>
            {
                images.map(image => getImageDiv(image))
            }
        </div>
    )
}

function getImageDiv(image: string): React.ReactElement {
    return (
        <div>
            <img className="h-auto max-w-full" src={image} alt="" />
        </div>
    )
}