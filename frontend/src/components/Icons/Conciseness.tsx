import React from 'react'

import type { IconProps } from './types'

const BookSquare = ({ width = 50, height = 50, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 37 41"
      fill="none"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" width="30" height="30" rx="15" fill="#41AB3F" />
      <g clip-path="url(#clip0_3098_5532)">
        <path
          d="M15.3196 14.8167C15.0937 14.8621 14.8603 14.9091 14.7155 15.0146C14.5733 15.118 14.4632 15.3146 14.3465 15.5226C14.1809 15.8181 14.0096 16.1236 13.706 16.2222C13.6437 16.2424 13.5766 16.2526 13.5064 16.2526C13.2755 16.2526 13.0354 16.1431 12.8033 16.0371C12.5891 15.9393 12.3676 15.8382 12.1795 15.8382C11.9913 15.8382 11.7699 15.9393 11.5556 16.0371C11.3235 16.1431 11.0835 16.2526 10.8526 16.2526C10.7824 16.2526 10.7153 16.2424 10.653 16.2221C10.3493 16.1236 10.1782 15.8181 10.0126 15.5227C9.96868 15.4443 9.92565 15.3676 9.88152 15.2968C9.65071 15.5652 9.51074 15.9138 9.51074 16.2946V19.7577C9.51074 20.6028 10.1983 21.2903 11.0435 21.2903C11.0888 21.2903 11.1308 21.314 11.1543 21.3527C11.1778 21.3914 11.1794 21.4396 11.1586 21.4797L10.3973 22.9454L13.4454 21.3058C13.4643 21.2957 13.4854 21.2903 13.5068 21.2903H18.8468C19.692 21.2903 20.3796 20.6028 20.3796 19.7577V16.2947C20.3796 15.7948 20.1389 15.3501 19.7674 15.0701L16.4614 18.3761C16.4491 18.3883 16.4346 18.398 16.4186 18.4045L15.4086 18.8159H18.4043C18.4759 18.8159 18.534 18.874 18.534 18.9456C18.534 19.0171 18.4759 19.0752 18.4043 19.0752H11.3306C11.259 19.0752 11.201 19.0171 11.201 18.9456C11.201 18.874 11.259 18.8159 11.3306 18.8159H14.6596L15.288 17.2737C15.2945 17.2577 15.3042 17.2431 15.3164 17.2309L17.7852 14.762H15.5726C15.4894 14.7825 15.4041 14.7997 15.3196 14.8167ZM14.7467 16.9231H11.3306C11.259 16.9231 11.201 16.8651 11.201 16.7935C11.201 16.7219 11.259 16.6639 11.3306 16.6639H14.7467C14.8183 16.6639 14.8763 16.7219 14.8763 16.7935C14.8764 16.8651 14.8183 16.9231 14.7467 16.9231Z"
          fill="white"
        />
        <path
          d="M16.3708 18.1026L15.5925 17.3243L21.6879 11.2289L22.4662 12.0073L16.3708 18.1026Z"
          fill="white"
        />
        <path
          d="M23.3815 10.5513L23.1412 10.311C23.0658 10.2357 22.9639 10.1925 22.8615 10.1925C22.7712 10.1925 22.6883 10.2257 22.6279 10.286L21.8708 11.0431L22.6494 11.8216L23.4065 11.0645C23.4701 11.001 23.5032 10.9133 23.4998 10.8178C23.4962 10.7187 23.4542 10.6241 23.3815 10.5513Z"
          fill="white"
        />
        <path
          d="M16.14 18.238L15.4544 17.5524L14.9829 18.7093L16.14 18.238Z"
          fill="white"
        />
        <path
          d="M8.32191 12.7775C8.39575 13.0047 8.36525 13.2716 8.33569 13.5297C8.30187 13.8254 8.26994 14.1048 8.39362 14.2747C8.51928 14.4475 8.79681 14.5034 9.09069 14.5625C9.34384 14.6135 9.60562 14.6662 9.79631 14.805C9.98428 14.9418 10.1137 15.1726 10.2388 15.3959C10.3865 15.6594 10.526 15.9083 10.7332 15.9756C10.7701 15.9875 10.8091 15.9933 10.8526 15.9933C11.0272 15.9933 11.2316 15.9 11.4481 15.8012C11.6875 15.6919 11.9351 15.5789 12.1796 15.5789C12.4241 15.5789 12.6716 15.6919 12.911 15.8012C13.1275 15.9 13.3319 15.9933 13.5065 15.9933C13.55 15.9933 13.5891 15.9875 13.626 15.9755C13.8332 15.9083 13.9727 15.6594 14.1203 15.3958C14.2455 15.1726 14.3749 14.9417 14.5629 14.8049C14.7536 14.6661 15.0153 14.6135 15.2684 14.5625C15.5623 14.5033 15.8398 14.4475 15.9656 14.2747C16.0892 14.1048 16.0573 13.8254 16.0234 13.5297C15.9938 13.2716 15.9633 13.0047 16.0371 12.7775C16.1075 12.5607 16.2849 12.3688 16.4565 12.1833C16.6544 11.9693 16.8591 11.748 16.8591 11.524C16.8591 11.2999 16.6544 11.0787 16.4565 10.8647C16.2849 10.6791 16.1075 10.4873 16.0371 10.2704C15.9633 10.0432 15.9938 9.77629 16.0234 9.51819C16.0573 9.22244 16.0892 8.94307 15.9656 8.77313C15.8399 8.60038 15.5623 8.5445 15.2684 8.48532C15.0152 8.43438 14.7536 8.38169 14.5629 8.24294C14.3749 8.10613 14.2455 7.87525 14.1203 7.652C13.9726 7.38847 13.8331 7.13957 13.626 7.07229C13.5891 7.06035 13.55 7.0545 13.5065 7.0545C13.332 7.0545 13.1275 7.14785 12.911 7.24669C12.6716 7.356 12.4241 7.46904 12.1796 7.46904C11.935 7.46904 11.6875 7.356 11.4481 7.24669C11.2316 7.14785 11.0272 7.0545 10.8526 7.0545C10.8091 7.0545 10.77 7.06035 10.7332 7.07229C10.526 7.13954 10.3865 7.38844 10.2388 7.65194C10.1137 7.87522 9.98428 8.1061 9.79628 8.24294C9.60562 8.38169 9.34387 8.43435 9.09081 8.48532C8.79694 8.5445 8.51937 8.60038 8.39362 8.77316C8.26994 8.9431 8.30187 9.22241 8.33569 9.51816C8.36522 9.77629 8.39575 10.0432 8.32191 10.2704C8.25153 10.4873 8.07409 10.6791 7.90253 10.8646C7.70462 11.0786 7.5 11.2999 7.5 11.524C7.5 11.748 7.70462 11.9693 7.9025 12.1832C8.07409 12.3688 8.25153 12.5606 8.32191 12.7775ZM12.1794 7.83554C14.2133 7.83554 15.8679 9.49016 15.8679 11.524C15.8679 13.5578 14.2133 15.2123 12.1794 15.2123C10.1457 15.2123 8.49106 13.5577 8.49106 11.524C8.49106 9.49016 10.1457 7.83554 12.1794 7.83554Z"
          fill="white"
        />
        <path
          d="M12.1793 14.953C14.0702 14.953 15.6085 13.4148 15.6085 11.5239C15.6085 9.6331 14.0702 8.09479 12.1793 8.09479C10.2885 8.09479 8.75024 9.6331 8.75024 11.5239C8.75024 13.4148 10.2885 14.953 12.1793 14.953ZM10.0942 10.2505H14.2647C14.3363 10.2505 14.3943 10.3085 14.3943 10.3801C14.3943 10.4517 14.3363 10.5098 14.2647 10.5098H10.0942C10.0227 10.5098 9.96462 10.4517 9.96462 10.3801C9.96459 10.3085 10.0227 10.2505 10.0942 10.2505ZM10.0942 11.3943H14.2647C14.3363 11.3943 14.3943 11.4523 14.3943 11.5239C14.3943 11.5955 14.3363 11.6535 14.2647 11.6535H10.0942C10.0227 11.6535 9.96462 11.5955 9.96462 11.5239C9.96462 11.4523 10.0227 11.3943 10.0942 11.3943ZM10.0942 12.5381H14.2647C14.3363 12.5381 14.3943 12.5961 14.3943 12.6677C14.3943 12.7393 14.3363 12.7973 14.2647 12.7973H10.0942C10.0227 12.7973 9.96462 12.7393 9.96462 12.6677C9.96459 12.5961 10.0227 12.5381 10.0942 12.5381Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_3098_5532">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(7.5 7)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default BookSquare
