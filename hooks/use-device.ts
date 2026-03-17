import { useState, useEffect } from "react"

export type DeviceType = "mobile" | "tablet" | "desktop"

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  deviceType: DeviceType
  width: number
  height: number
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    deviceType: "desktop",
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileAgent = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isTabletAgent = /tablet|ipad/i.test(userAgent)

      let deviceType: DeviceType = "desktop"
      if (width < 768 || (isMobileAgent && !isTabletAgent)) {
        deviceType = "mobile"
      } else if (width >= 768 && width < 1024 || isTabletAgent) {
        deviceType = "tablet"
      }

      setDeviceInfo({
        isMobile: deviceType === "mobile",
        isTablet: deviceType === "tablet",
        isDesktop: deviceType === "desktop",
        deviceType,
        width,
        height,
      })
    }

    // Initial check
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return deviceInfo
}
