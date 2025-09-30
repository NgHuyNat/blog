import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React, { useState, useRef, useEffect, useCallback } from "react"
import { Emoji } from "src/components/Emoji"
import { useTagsQuery } from "src/hooks/useTagsQuery"
import { IconTag } from "obra-icons-react"

type Props = {}

const SearchableTagSelector: React.FC<Props> = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const allTags = useTagsQuery()
  const availableTags = Object.keys(allTags)

  // Initialize selected tags from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const tagsParam = searchParams.get("tags")
    const newSelectedTags = tagsParam
      ? tagsParam.split(",").filter(Boolean)
      : []
    setSelectedTags(newSelectedTags)
  }, [router.asPath]) // Update URL parameters
  const updateUrlParams = useCallback(
    (tags: string[]) => {
      const currentPath = router.asPath.split("?")[0]
      const searchParams = new URLSearchParams(window.location.search)

      if (tags.length > 0) {
        searchParams.set("tags", tags.join(","))
      } else {
        searchParams.delete("tags")
      }

      const newUrl = searchParams.toString()
        ? `${currentPath}?${searchParams.toString()}`
        : currentPath

      router.replace(newUrl, undefined, { shallow: true })
    },
    [router]
  )

  // Filter tags based on search term
  const filteredTags = availableTags.filter(
    (tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTags.includes(tag)
  )

  // Handle tag selection
  const handleSelectTag = useCallback(
    (tag: string) => {
      const newSelectedTags = [...selectedTags, tag]
      setSelectedTags(newSelectedTags)
      updateUrlParams(newSelectedTags)
      setSearchTerm("")
      setIsDropdownOpen(false)
    },
    [selectedTags, updateUrlParams]
  )

  // Handle tag removal
  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      const newSelectedTags = selectedTags.filter((tag) => tag !== tagToRemove)
      setSelectedTags(newSelectedTags)
      updateUrlParams(newSelectedTags)
    },
    [selectedTags, updateUrlParams]
  )

  // Handle input focus
  const handleInputFocus = () => {
    setIsDropdownOpen(true)
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isOutsideDropdown =
        dropdownRef.current && !dropdownRef.current.contains(target)
      const isOutsideInput =
        inputRef.current && !inputRef.current.contains(target)

      if (isOutsideDropdown && isOutsideInput) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <StyledWrapper>
      {/* Search Input */}
      <div className="search-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          className="search-input"
        />

        {/* Dropdown với gợi ý */}
        {isDropdownOpen && filteredTags.length > 0 && (
          <div ref={dropdownRef} className="dropdown">
            {filteredTags.slice(0, 8).map((tag) => (
              <div
                key={tag}
                className="dropdown-item"
                onClick={() => handleSelectTag(tag)}
              >
                {tag}
                <span className="count">({allTags[tag]})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="selected-tags">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="selected-tag"
              onClick={() => handleRemoveTag(tag)}
            >
              {tag}
              <span className="remove-icon">×</span>
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  )
}

export default SearchableTagSelector

const StyledWrapper = styled.div`
  .top {
    display: none;
    padding: 0.25rem;
    margin-bottom: 0.75rem;

    @media (min-width: 1024px) {
      display: block;
    }
  }

  .search-container {
    position: relative;
    margin-bottom: 1rem;

    .search-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      background-color: ${({ theme }) => theme.colors.gray2};
      color: ${({ theme }) => theme.colors.gray12};
      font-size: 0.875rem;
      outline: none;
      transition: all 0.2s ease;

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray9};
      }

      &:focus {
        border-color: ${({ theme }) => theme.colors.gray8};
        background-color: ${({ theme }) => theme.colors.gray1};
      }
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 50;
      max-height: 200px;
      overflow-y: auto;
      background-color: ${({ theme }) => theme.colors.gray1};
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      margin-top: 0.25rem;

      .dropdown-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        font-size: 0.875rem;
        color: ${({ theme }) => theme.colors.gray11};
        transition: background-color 0.2s ease;

        &:hover {
          background-color: ${({ theme }) => theme.colors.gray3};
        }

        .count {
          color: ${({ theme }) => theme.colors.gray9};
          font-size: 0.75rem;
        }
      }
    }
  }

  .selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;

    .selected-tag {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      background-color: ${({ theme }) => theme.colors.gray4};
      color: ${({ theme }) => theme.colors.gray12};
      border-radius: 1rem;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.colors.gray5};
      }

      .remove-icon {
        font-size: 1rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.gray10};
        margin-left: 0.25rem;

        &:hover {
          color: ${({ theme }) => theme.colors.red9};
        }
      }
    }
  }
`
