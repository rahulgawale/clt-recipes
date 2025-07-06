# This Repo Demonstrates how to use the newLightning Types

Create a new Scratch org by running the following command:

```bash
sf org create scratch --definition-file config/project-scratch-def.json --alias agentActionDemo -target-dev-hub ktl-pbo --duration-days 30
```

Now that you have enabled Agentforce From Setup, run this command to retrieve the latest changes from your org:

```bash
sf project retrieve start -d force-app
```

# and then deploy the changes to your org:

```bash
sf project deploy start -d force-app
```
