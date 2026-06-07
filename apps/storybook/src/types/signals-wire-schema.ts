/**
 * G1 Signals Wire Schema Types
 * Models the SignalsUICardSchema from CISO MVP Blueprint Section 7.
 * These types define the HSTP-1.0 Messenger packet structure that
 * carries payload blocks to the Signals UI Stage for rendering.
 */

export interface Ieee2874TransportHeader {
  protocol_class: "HSTP-1.0";
  serialization_format: "XDBML" | "HSML-JSON";
  routing_context_aid: string;
  global_session_said: string;
}

export type LegalGateStatus =
  | "ASSERTED_CRITICAL"
  | "VERIFIED_COMPLIANT"
  | "BYPASS_PENDING";

export interface RegistryGate {
  registry_id: string;
  authority_statute: string;
  legal_gate_status: LegalGateStatus;
}

export interface SignalsComplianceLedger {
  active_registry_gates: RegistryGate[];
  compliance_state_hash: string;
}

export type EnclaveHardwareClass = "TEE_HARDWARE_NITRO" | "TEE_HARDWARE_SGX";

export interface TeeAttestation {
  enclave_hardware_class: EnclaveHardwareClass;
  cryptographic_quote_hash: string;
  status: "ATTESTATION_VERIFIED_TRUE";
}

export interface KeriInfrastructure {
  kel_sequence_num: number;
  vlei_role_assertion?: string;
  tee_attestation: TeeAttestation;
}

export interface NistPqcInventoryRegistry {
  cbom_format: "CycloneDX-1.6::CBOM";
  vulnerable_algorithm_count: number;
  target_compliance_protocols: string[];
}

export interface SignalsPayloadBlock {
  signalsUiCatalogId: string;
  said: string;
  signalsUiProperties: Record<string, unknown>;
}

export interface SignalsUiMessenger {
  ieee_2874_transport_header: Ieee2874TransportHeader;
  signals_compliance_ledger: SignalsComplianceLedger;
  keri_infrastructure: KeriInfrastructure;
  nist_pqc_inventory_registry?: NistPqcInventoryRegistry;
  g1_signals_payload_blocks: SignalsPayloadBlock[];
}
