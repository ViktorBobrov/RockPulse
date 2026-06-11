"use client";
import React from "react";
import { Card } from "../types/card";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MachineStatus } from "../types/status";
import { statusConfig } from "../types/statusConfig";
import styles from "./MashineMap.module.css";

const statusClassMap: Record<MachineStatus, string> = {
  [MachineStatus.WORK]: styles.statusWork,
  [MachineStatus.STOPPED]: styles.statusStopped,
  [MachineStatus.ERROR]: styles.statusError,
};

type MashineMapProps = {
  imageUrl: string;
  machines: Card[];
  selectedId: number | null;
};

export default function MashineMap({ imageUrl, machines, selectedId }: MashineMapProps) {
  const bounds: L.LatLngBoundsExpression = [[0, 0], [800, 1000]];
  const getIcon = (status: MachineStatus) => {
    const color = status === MachineStatus.WORK ? "green"
      : status === MachineStatus.ERROR ? "red"
      : "gray";
    return L.divIcon({
      className: "",
      html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white"></div>`,
    });         // ← закрыть divIcon
  };            // ← закрыть getIcon
  // RETURN компонента — отдельно
  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={bounds}
      style={{ height: "600px", width: "100%" }}
      maxBounds={bounds}
    >
      <ImageOverlay url={imageUrl} bounds={bounds} />
      {machines.map((machine) => (
        <Marker
          key={machine.id}
          position={[machine.position.y, machine.position.x]}
          icon={getIcon(machine.status)}
        >
          <Popup className={styles.popup}>
            <div className={styles.content}>
              <h3 className={styles.title}>{machine.name}</h3>
              <p className={`${styles.status} ${statusClassMap[machine.status]}`}>
                Статус: {statusConfig[machine.status].label}
              </p>
              <ul className={styles.metrics}>
                <li className={styles.metric}>
                  <span className={styles.metricLabel}>Двигатель</span>
                  <span className={styles.metricValue}>{machine.engine} °C</span>
                </li>
                <li className={styles.metric}>
                  <span className={styles.metricLabel}>Гидравлика</span>
                  <span className={styles.metricValue}>{machine.hydraulic} °C</span>
                </li>
                <li className={styles.metric}>
                  <span className={styles.metricLabel}>Нагрузка</span>
                  <span className={styles.metricValue}>{machine.load}%</span>
                </li>
              </ul>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}