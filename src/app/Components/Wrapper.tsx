import React from 'react';
import classNames from 'classnames';

interface WrapperProps extends React.HTMLProps<HTMLDivElement> {
    width?: string; // Prop for width
    bgColor?: string; // Prop for background color
    gap?: string; // Prop for gap
}

export default function Wrapper({ width, bgColor, gap, className, ...props }: WrapperProps) {
    // Create a combined class string with conditional width, background color, and gap
    const combinedClassName = classNames(
        'border rounded-xl flex items-center p-4 shadow-sm',
        {
            'w-full': !width, // Apply w-full if width is not provided
            'bg-white': !bgColor, // Apply bg-white if bgColor is not provided
            [`gap-${gap}`]: gap, // Apply the custom gap if provided
        },
        width, // Apply the custom width if provided
        bgColor, // Apply the custom background color if provided
        className // Preserve any other classes passed in via className
    );

    return (
        <div className={combinedClassName} {...props} />
    );
}
