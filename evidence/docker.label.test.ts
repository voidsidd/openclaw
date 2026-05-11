import { describe, expect, it } from "vitest";
import { readDockerContainerLabel } from "../src/agents/sandbox/docker.js";

describe("readDockerContainerLabel Validation", () => {
    it("allows valid labels including slashes", async () => {
          try {
                  await readDockerContainerLabel("nonexistent-container", "valid.label");
          } catch (err: any) {
                  expect(err.message).not.toContain("Invalid label name");
          }
          try {
                  await readDockerContainerLabel("nonexistent-container", "valid/label");
          } catch (err: any) {
                  expect(err.message).not.toContain("Invalid label name");
          }
    });

    it("rejects invalid labels", async () => {
          await expect(readDockerContainerLabel("nonexistent-container", "invalid label")).rejects.toThrow("Invalid label name");
          await expect(readDockerContainerLabel("nonexistent-container", "invalid@label")).rejects.toThrow("Invalid label name");
          await expect(readDockerContainerLabel("nonexistent-container", "invalid$label")).rejects.toThrow("Invalid label name");
    });
});
