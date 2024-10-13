import React, { useState } from "react";
import Modal from "./modal";
import MapComponent from "./MapComponent";
import DirectionsMap from "./DirectionsMap";

const AdditionalInfoTable = ({
  additionalInfo,
  row,
  mapComponent: MapComponentProp,
  directionsComponent: DirectionsComponentProp,
  tableTitle = "Additional Information",
  children,
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDirectionOpen, setIsDirectionOpen] = useState(false);

  return (
    <tr>
      <td colSpan={6}>
        <div className="p-2 m-2 pb-6 w-3/4 mx-auto rounded-xl bg-secondary">
          <h4 className="text-center font-museo text-3xl my-6">{tableTitle}</h4>
          <table className="w-11/12 mx-auto table-auto border-collapse">
            <tbody>
              {additionalInfo.map((info) => (
                <tr className="border-b" key={info.label}>
                  <td className="p-1">{info.label}</td>
                  <td className="text-end">
                    {info.label === "Exact Location" ? (
                      <>
                        <button
                          className="text-blue-500 mr-4"
                          onClick={() => setIsMapOpen(true)}
                        >
                          {info.value[0]}
                        </button>
                        <button
                          className="text-blue-500"
                          onClick={() => setIsDirectionOpen(true)}
                        >
                          {info.value[1]}
                        </button>
                      </>
                    ) : (
                      info.value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {children}

          <Modal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)}>
            <h3 className="text-center mb-4">View Location</h3>
            {MapComponentProp ? (
              <MapComponentProp
                latitude={row.latitude}
                longitude={row.longitude}
              />
            ) : (
              <MapComponent latitude={row.latitude} longitude={row.longitude} />
            )}
          </Modal>

          <Modal
            isOpen={isDirectionOpen}
            onClose={() => setIsDirectionOpen(false)}
          >
            <h3 className="text-center mb-4">Get Directions</h3>
            {DirectionsComponentProp ? (
              <DirectionsComponentProp
                destination={[row.latitude, row.longitude]}
              />
            ) : (
              <DirectionsMap destination={[row.latitude, row.longitude]} />
            )}
          </Modal>
        </div>
      </td>
    </tr>
  );
};

export default AdditionalInfoTable;
