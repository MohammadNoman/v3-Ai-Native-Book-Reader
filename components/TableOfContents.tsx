import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    rawContent: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ rawContent }) => {
    const [activeId, setActiveId] = useState<string>('');
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Extract headings from MDX content
    const headings = useMemo(() => {
        // Safety check: ensure rawContent is a valid string
        if (!rawContent || typeof rawContent !== 'string') {
            return [];
        }

        const headingRegex = /^(#{2,3})\s+(.+)$/gm;
        const matches = [...rawContent.matchAll(headingRegex)];

        return matches.map((match, index) => {
            const level = match[1].length;
            const text = match[2].trim();
            // Create a URL-friendly ID from the heading text
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');

            return { id, text, level };
        });
    }, [rawContent]);

    // Scroll spy effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -80% 0px',
                threshold: 0.1,
            }
        );

        // Observe all heading elements
        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [headings]);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <div className="relative">
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="toc-toggle"
                aria-label={isCollapsed ? 'Expand table of contents' : 'Collapse table of contents'}
            >
                {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {/* TOC Sidebar */}
            <nav className={`toc-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                {!isCollapsed && (
                    <>
                        <div className="toc-title">On This Page</div>
                        <ul className="toc-list">
                            {headings.map(({ id, text, level }) => (
                                <li key={id} className="toc-item">
                                    <a
                                        href={`#${id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleClick(id);
                                        }}
                                        className={`toc-link ${level === 3 ? 'level-3' : ''} ${activeId === id ? 'active' : ''
                                            }`}
                                    >
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </nav>
        </div>
    );
};

export default TableOfContents;
