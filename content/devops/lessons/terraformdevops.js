  const TERRAFORM_CMDS = {
    init: { syntax:`terraform init`, cmd:`terraform init`, output:`Initializing the backend...

Initializing provider plugins...
- Finding hashicorp/aws versions matching "~> 5.0"...
- Installing hashicorp/aws v5.31.0...
- Installed hashicorp/aws v5.31.0 (signed by HashiCorp)

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above.

<span class="ok">Terraform has been successfully initialized!</span>

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure.`, does:`Sets up a Terraform project: downloads the provider plugins your config needs, and sets up the local (or remote) backend that will store state.`, where:`The very first command in any Terraform project — and the first thing to re-run after adding a new provider or module.`, breakdown:[{term:`terraform`, desc:`the CLI`},{term:`init`, desc:`initialize this directory as a Terraform project`}], whyUseful:`<div class="found-p">You clone a coworker's Terraform project for the first time, and every command fails with "provider not found."</div><div class="found-pre">$ terraform plan\nError: Inconsistent dependency lock file</div><div class="found-p">One <span class="found-code">terraform init</span>, and every plugin the config needs gets downloaded locally — this is always the first command in a fresh checkout, before anything else works.</div>` },

    plan: { syntax:`terraform plan`, cmd:`terraform plan`, output:`Terraform used the selected providers to generate the following execution
plan. Resource actions are indicated with the following symbols:
  <span class="ok">+</span> create

Terraform will perform the following actions:

  # aws_instance.web will be created
  <span class="ok">+</span> resource "aws_instance" "web" {
      <span class="ok">+</span> ami                    = "ami-0c55b159cbfafe1f0"
      <span class="ok">+</span> instance_type          = "t3.micro"
      <span class="ok">+</span> id                     = (known after apply)
      <span class="ok">+</span> public_ip              = (known after apply)
      <span class="ok">+</span> tags                   = {
          <span class="ok">+</span> "Name" = "web-server"
        }
    }

<span class="ok">Plan: 1 to add, 0 to change, 0 to destroy.</span>

<span class="dim">─────────────────────────────────────────────────────</span>

Note: You didn't use the -out option to save this plan, so Terraform
can't guarantee to take exactly these actions if you run "terraform apply" now.`, does:`Compares your .tf files against the current state and shows exactly what would be created, changed, or destroyed — without touching anything for real.`, where:`Run before every single apply — the safety net that turns "hope this works" into "I already know exactly what's about to happen."`, breakdown:[{term:`terraform plan`, desc:`generate and display an execution plan`},{term:`+`, desc:`this attribute/resource will be created`},{term:`(known after apply)`, desc:`AWS assigns this value — Terraform can't know it until the resource actually exists`}], whyUseful:`<div class="found-p">A teammate opens a pull request changing one line of Terraform. Does it just tweak a tag, or does it secretly destroy and rebuild the whole database?</div><div class="found-pre">$ terraform plan\n  # aws_db_instance.main must be replaced\n-/+ resource "aws_db_instance" "main" {\n      ~ engine_version = "14.6" -> "15.2" # forces replacement\n    }</div><div class="found-p">That <span class="found-code">-/+</span> and "forces replacement" note is the whole point — plan turns a silent, catastrophic surprise into something caught and discussed before anyone types "yes."</div>` },

    apply: { syntax:`terraform apply`, cmd:`terraform apply`, output:`Terraform will perform the following actions:

  # aws_instance.web will be created
  <span class="ok">+</span> resource "aws_instance" "web" {
      <span class="ok">+</span> instance_type = "t3.micro"
    }

<span class="ok">Plan: 1 to add, 0 to change, 0 to destroy.</span>

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: <span class="hi">yes</span>

aws_instance.web: Creating...
aws_instance.web: Still creating... [10s elapsed]
aws_instance.web: Creation complete after 24s [id=i-0abc123def456789]

<span class="ok">Apply complete! Resources: 1 added, 0 changed, 0 destroyed.</span>

Outputs:

public_ip = "54.123.45.67"`, does:`Runs the plan for real — actually creates, updates, or destroys resources by calling the cloud provider's API. Prompts for a typed "yes" unless -auto-approve is passed.`, where:`The actual moment infrastructure gets provisioned — everything before this was just a preview.`, breakdown:[{term:`terraform apply`, desc:`execute the plan for real`},{term:`Enter a value: yes`, desc:`the explicit confirmation gate — nothing destructive happens by accident`},{term:`Creating... / Creation complete`, desc:`live progress, one resource at a time, with the real elapsed time`}], whyUseful:`<div class="found-p">A new service needs a server, and instead of manually clicking through the AWS console step by step, you already wrote the config.</div><div class="found-pre">$ terraform apply\n...\naws_instance.web: Creation complete after 24s [id=i-0abc123def456789]\n\nApply complete! Resources: 1 added, 0 changed, 0 destroyed.</div><div class="found-p">One command, and a real, running server exists — and because it came from a .tf file instead of clicks, anyone on the team can recreate the exact same thing again later.</div>` },

    destroy: { syntax:`terraform destroy`, cmd:`terraform destroy`, output:`  # aws_instance.web will be destroyed
  <span class="err">-</span> resource "aws_instance" "web" {
      <span class="err">-</span> instance_type = "t3.micro" -> null
    }

<span class="err">Plan: 0 to add, 0 to change, 1 to destroy.</span>

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  Only 'yes' will be accepted to confirm.

  Enter a value: <span class="hi">yes</span>

aws_instance.web: Destroying... [id=i-0abc123def456789]
aws_instance.web: Destruction complete after 5s

<span class="err">Destroy complete! Resources: 1 destroyed.</span>`, does:`Destroys every resource Terraform is currently tracking in the state file — the exact reverse of apply.`, where:`Tearing down a temporary environment (like a PR preview environment) once it's no longer needed, so it stops costing money.`, breakdown:[{term:`terraform destroy`, desc:`plan and execute a full teardown`},{term:`-`, desc:`this resource will be removed entirely`}], whyUseful:`<div class="found-p">A short-lived staging environment was spun up to test a feature branch, and now the PR is merged — leaving it running is pure wasted cloud spend.</div><div class="found-pre">$ terraform destroy\n...\nDestroy complete! Resources: 4 destroyed.</div><div class="found-p">One command, and every resource that environment created — server, database, load balancer, all of it — is gone cleanly, with the exact same review-before-you-commit safety as apply.</div>` },

    fmt: { syntax:`terraform fmt`, cmd:`terraform fmt`, output:`main.tf
variables.tf

<span class="dim">↳ files reformatted to canonical style — consistent spacing and alignment</span>`, does:`Automatically rewrites .tf files into Terraform's standard formatting — consistent indentation and aligned = signs.`, where:`Run before every commit (or as a pre-commit hook) so every file in the repo looks like it was written by the same person.`, breakdown:[{term:`terraform fmt`, desc:`reformat every .tf file in the current directory`}], whyUseful:`<div class="found-p">Ten different engineers write Terraform with ten different spacing habits, and every pull request becomes a noisy diff of whitespace changes nobody asked for.</div><div class="found-pre">resource "aws_instance" "web" {\n  instance_type="t3.micro"\n    ami = "ami-123"\n}</div><div class="found-p">One <span class="found-code">terraform fmt</span>, and every file snaps to the exact same style — real code review can focus on what actually changed, not indentation.</div>` },

    validate: { syntax:`terraform validate`, cmd:`terraform validate`, output:`<span class="ok">Success! The configuration is valid.</span>`, does:`Checks your config for syntax errors and internal consistency — without needing to talk to the cloud provider or an existing state file at all.`, where:`A fast local sanity check in CI, right after fmt and before a much slower plan.`, breakdown:[{term:`terraform validate`, desc:`check syntax and internal references, offline`}], whyUseful:`<div class="found-p">A typo — a missing comma, an unclosed brace — is buried somewhere in a 400-line Terraform file, and terraform plan's error message doesn't point at it clearly.</div><div class="found-pre">$ terraform validate\nError: Unsupported argument\n\n  on main.tf line 12, in resource "aws_instance" "web":\n  12:   instence_type = "t3.micro"</div><div class="found-p">Catches typos and structural mistakes in about a second, with a precise file and line number — far faster than waiting on a full plan against real infrastructure.</div>` },

    providerBlock: { syntax:`provider "&lt;name&gt;" {\n  ...\n}`, cmd:`cat provider.tf`, output:`provider "aws" {
  region = "us-east-1"
}`, does:`Configures how Terraform talks to a specific cloud platform — which region, which credentials, which account.`, where:`Every Terraform project needs at least one — it's what terraform init reads to know which plugin to download.`, breakdown:[{term:`provider`, desc:`the block type`},{term:`&quot;aws&quot;`, desc:`which provider — could be azurerm, google, and dozens more`},{term:`region`, desc:`a provider-specific setting — this one tells AWS which region to create resources in`}], whyUseful:`<div class="found-p">A company runs infrastructure across both AWS and GCP, and one Terraform project needs to talk to both at once.</div><div class="found-pre">provider "aws" {\n  region = "us-east-1"\n}\n\nprovider "google" {\n  project = "my-project-id"\n}</div><div class="found-p">Two provider blocks, and a single <span class="found-code">terraform apply</span> can create resources in both clouds in the same run — this is genuinely how real multi-cloud Terraform projects are structured.</div>` },

    resourceBlock: { syntax:`resource "&lt;type&gt;" "&lt;name&gt;" {\n  ...\n}`, cmd:`cat main.tf`, output:`resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
}`, does:`Declares one real, managed object — the fundamental building block of every Terraform config.`, where:`Everything you're actually trying to create — a server, a network, a bucket — is a resource block.`, breakdown:[{term:`resource`, desc:`the block type — "I want Terraform to manage something"`},{term:`&quot;aws_instance&quot;`, desc:`the resource TYPE — defined by the provider, tells Terraform what kind of thing this is`},{term:`&quot;web&quot;`, desc:`YOUR local name for it — used to reference it elsewhere in this config, e.g. aws_instance.web`}], whyUseful:`<div class="found-p">You need to create an EC2 instance, and you want other parts of your config (like a security group) to be able to reference it later.</div><div class="found-pre">resource "aws_instance" "web" {\n  instance_type = "t3.micro"\n}\n\nresource "aws_eip" "web_ip" {\n  instance = aws_instance.web.id\n}</div><div class="found-p"><span class="found-code">aws_instance.web.id</span> — the elastic IP resource directly references the instance's id, and Terraform automatically knows to create the instance first.</div>` },

    variableBlock: { syntax:`variable "&lt;name&gt;" {\n  default = &lt;value&gt;\n}`, cmd:`cat variables.tf`, output:`variable "instance_type" {
  description = "EC2 instance size"
  type        = string
  default     = "t3.micro"
}`, does:`Defines a named input that a config can accept, with an optional default value if nothing else is provided.`, where:`Anywhere a config needs to be reused with different settings — different sizes for dev vs. production, for example.`, breakdown:[{term:`variable`, desc:`the block type`},{term:`&quot;instance_type&quot;`, desc:`the variable's name — referenced elsewhere as var.instance_type`},{term:`default`, desc:`used automatically if no other value is supplied`}], whyUseful:`<div class="found-p">The exact same server config should use a small instance in dev and a much larger one in production — without maintaining two separate copies of the file.</div><div class="found-pre">resource "aws_instance" "web" {\n  instance_type = var.instance_type\n}</div><div class="found-pre">$ terraform apply -var="instance_type=t3.large"</div><div class="found-p">One config, and the exact same file safely produces a small dev server or a large production one, just by changing what's passed in.</div>` },

    outputBlock: { syntax:`output "&lt;name&gt;" {\n  value = &lt;expression&gt;\n}`, cmd:`cat outputs.tf`, output:`output "public_ip" {
  value = aws_instance.web.public_ip
}`, does:`Prints a value back out after apply finishes — and lets other Terraform configs read it too.`, where:`Grabbing a value you actually need afterward — the new server's IP, a generated URL, a database endpoint.`, breakdown:[{term:`output`, desc:`the block type`},{term:`&quot;public_ip&quot;`, desc:`the output's name — shown as this label after apply`},{term:`value`, desc:`any expression — usually a reference to an attribute of a resource`}], whyUseful:`<div class="found-p">After creating a server, you need its public IP to actually connect to it — but hunting through the AWS console for it is slow and manual.</div><div class="found-pre">$ terraform apply\n...\nOutputs:\n\npublic_ip = "54.123.45.67"</div><div class="found-p">The IP prints right in the terminal the moment apply finishes — and <span class="found-code">terraform output public_ip</span> can grab it again anytime later, even in a script.</div>` },

    dataSource: { syntax:`data "&lt;type&gt;" "&lt;name&gt;" {\n  ...\n}`, cmd:`cat data.tf`, output:`data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/*22.04*"]
  }
}`, does:`Looks up information about something that already exists, but that this config isn't managing or creating itself.`, where:`Referencing an already-existing VPC, the latest AMI ID, or an existing resource created by a completely separate Terraform project.`, breakdown:[{term:`data`, desc:`the block type — read-only, never creates or destroys anything`},{term:`&quot;aws_ami&quot;`, desc:`the data source type`},{term:`&quot;ubuntu&quot;`, desc:`your local name for it — referenced as data.aws_ami.ubuntu`}], whyUseful:`<div class="found-p">Hardcoding a specific AMI ID means your config silently uses an increasingly outdated, unpatched image forever.</div><div class="found-pre">resource "aws_instance" "web" {\n  ami = data.aws_ami.ubuntu.id\n}</div><div class="found-p">Instead of a frozen ID, this always resolves to whatever the actual latest matching Ubuntu image is at apply time — a data source instead of a hardcoded string.</div>` },

    localsBlock: { syntax:`locals {\n  &lt;name&gt; = &lt;expression&gt;\n}`, cmd:`cat locals.tf`, output:`locals {
  name_prefix = "myapp-\${var.environment}"
}

resource "aws_instance" "web" {
  tags = {
    Name = local.name_prefix
  }
}`, does:`Defines a named expression, computed once, that can be reused throughout the config — like a local variable inside the file.`, where:`Avoiding repeating the same computed value (like a naming prefix) in ten different places.`, breakdown:[{term:`locals`, desc:`the block type — no quotes/labels needed, unlike resource or variable`},{term:`name_prefix`, desc:`the local's name — referenced elsewhere as local.name_prefix`}], whyUseful:`<div class="found-p">Every resource in a project needs the same "myapp-production-" naming prefix, and typing that string out in twenty different places is an easy way to introduce a typo in just one of them.</div><div class="found-pre">locals {\n  prefix = "myapp-\${var.environment}"\n}</div><div class="found-p">Change the prefix pattern once, in one place, and every resource that references <span class="found-code">local.prefix</span> updates consistently — no hunting down copies.</div>` },

    stateList: { syntax:`terraform state list`, cmd:`terraform state list`, output:`aws_instance.web
aws_security_group.web_sg
aws_eip.web_ip`, does:`Lists every resource currently tracked in the state file — a quick inventory of everything Terraform thinks it's managing.`, where:`Confirming what actually exists before making a change, or double-checking nothing got left behind after a partial apply.`, breakdown:[{term:`terraform state list`, desc:`print every resource address in the current state`}], whyUseful:`<div class="found-p">A project has grown to dozens of resources across several files, and you need a quick answer to "what does Terraform actually think it's managing right now?"</div><div class="found-pre">$ terraform state list\naws_instance.web\naws_db_instance.main\naws_s3_bucket.assets</div><div class="found-p">One command, and you have the full inventory — without opening the (much less readable) raw JSON state file directly.</div>` },

    stateShow: { syntax:`terraform state show &lt;address&gt;`, cmd:`terraform state show aws_instance.web`, output:`# aws_instance.web:
resource "aws_instance" "web" {
    ami                    = "ami-0c55b159cbfafe1f0"
    id                     = "i-0abc123def456789"
    instance_type          = "t3.micro"
    public_ip              = "54.123.45.67"
    tags                   = {
        "Name" = "web-server"
    }
}`, does:`Shows every attribute Terraform currently has recorded for one specific resource, exactly as stored in state.`, where:`Debugging — confirming exactly what value Terraform believes a resource has, especially attributes only known after creation, like an assigned IP.`, breakdown:[{term:`terraform state show`, desc:`print one resource's full recorded attributes`},{term:`aws_instance.web`, desc:`the resource's address — type.name, exactly as it appears in "terraform state list"`}], whyUseful:`<div class="found-p">You need a server's real, currently-assigned public IP, and you don't want to dig through the AWS console to find it.</div><div class="found-pre">$ terraform state show aws_instance.web\n...\n    public_ip = "54.123.45.67"</div><div class="found-p">Straight from Terraform's own memory of what it created — the same value the console would show, without leaving the terminal.</div>` },

    show: { syntax:`terraform show`, cmd:`terraform show`, output:`# aws_instance.web:
resource "aws_instance" "web" {
    ami           = "ami-0c55b159cbfafe1f0"
    instance_type = "t3.micro"
    public_ip     = "54.123.45.67"
}

# aws_security_group.web_sg:
resource "aws_security_group" "web_sg" {
    ...
}`, does:`Shows the full current state — every resource and every attribute — in one readable dump.`, where:`A complete snapshot of "what does my infrastructure actually look like right now, according to Terraform."`, breakdown:[{term:`terraform show`, desc:`print the entire current state, human-readably`}], whyUseful:`<div class="found-p">Before handing off a project to a new teammate, you want them to see the complete current picture of the infrastructure without reading every .tf file line by line.</div><div class="found-pre">$ terraform show\n# aws_instance.web:\n...\n# aws_db_instance.main:\n...</div><div class="found-p">One command gives a full, readable inventory of literally everything currently under management — the closest thing to "cat the entire database" that Terraform offers.</div>` },

    outputCmd: { syntax:`terraform output &lt;name&gt;`, cmd:`terraform output public_ip`, output:`"54.123.45.67"`, does:`Prints the value of one specific output (or all of them, with no argument) — read straight from the current state, without re-running apply.`, where:`Grabbing a value like a server's IP or a database endpoint inside a script, right after a CI/CD pipeline's apply step.`, breakdown:[{term:`terraform output`, desc:`read output values from state`},{term:`public_ip`, desc:`the specific output's name — omit it to print every output`}], whyUseful:`<div class="found-p">A CI/CD pipeline just ran terraform apply, and the next step (deploying the app) needs the new server's IP — but the pipeline log output isn't something a script can easily parse.</div><div class="found-pre">$ IP=$(terraform output -raw public_ip)\n$ ssh deploy@$IP</div><div class="found-p">The <span class="found-code">-raw</span> flag strips the quotes, so the value drops straight into a variable a deploy script can use immediately.</div>` },

    importCmd: { syntax:`terraform import &lt;address&gt; &lt;id&gt;`, cmd:`terraform import aws_instance.web i-0abc123def456789`, output:`aws_instance.web: Importing from ID "i-0abc123def456789"...
aws_instance.web: Import prepared!
  Prepared aws_instance for import
aws_instance.web: Refreshing state... [id=i-0abc123def456789]

<span class="ok">Import successful!</span>`, does:`Brings an already-existing resource — one that was created manually, outside Terraform — under Terraform's management, by adding it to the state file.`, where:`A server was created by hand months ago, and now the team wants Terraform to manage it going forward, without destroying and recreating it.`, breakdown:[{term:`terraform import`, desc:`add an existing real resource into the state file`},{term:`aws_instance.web`, desc:`the resource address it will be tracked as — you still need a matching resource block in your .tf files`},{term:`i-0abc123def456789`, desc:`the real, provider-specific ID of the thing already out there`}], whyUseful:`<div class="found-p">A critical production database was created by hand two years ago, long before this team used Terraform — destroying and recreating it to "do it properly" isn't an option.</div><div class="found-pre">$ terraform import aws_db_instance.main mydb-instance-id\nImport successful!</div><div class="found-p">Terraform now tracks and manages that existing database going forward — no downtime, no recreation, just brought under version-controlled management from this point on.</div>` },

    moduleBlock: { syntax:`module "&lt;name&gt;" {\n  source = "&lt;path&gt;"\n}`, cmd:`cat main.tf`, output:`module "web_server" {
  source        = "./modules/ec2-instance"
  instance_type = "t3.micro"
}`, does:`Reuses a self-contained, pre-written chunk of Terraform config — write the logic once, call it with different inputs anywhere.`, where:`A "standard web server setup" that gets reused across five different projects, instead of five teams copy-pasting the same 100 lines.`, breakdown:[{term:`module`, desc:`the block type`},{term:`&quot;web_server&quot;`, desc:`your local name for this instance of the module`},{term:`source`, desc:`where the module's own .tf files live — a local path, a Git repo, or the public Terraform Registry`}], whyUseful:`<div class="found-p">Every team at a company keeps copy-pasting the same 100-line "standard secure web server" config, and a security fix now has to be manually applied in a dozen different repos.</div><div class="found-pre">module "web_server" {\n  source = "git::https://github.com/org/tf-modules//web-server"\n}</div><div class="found-p">Fix the module once, in one place, and every team that references it picks up the fix the next time they run <span class="found-code">terraform init -upgrade</span>.</div>` },

    workspace: { syntax:`terraform workspace new &lt;name&gt;`, cmd:`terraform workspace new staging`, output:`<span class="ok">Created and switched to workspace "staging"!</span>

You're now on a new, empty workspace. Workspaces isolate their state,
so if you run "terraform plan" Terraform will not see any existing state
for this configuration.`, does:`Creates a separate, isolated copy of state under the same config — the same .tf files, but a completely independent set of tracked resources.`, where:`Running the same config for both a staging and production environment without duplicating any files.`, breakdown:[{term:`terraform workspace new`, desc:`create a new isolated state`},{term:`staging`, desc:`the workspace's name — switch back with "terraform workspace select"`}], whyUseful:`<div class="found-p">The exact same infrastructure config needs to exist twice — once for staging, once for production — without literally duplicating every .tf file.</div><div class="found-pre">$ terraform workspace new staging\n$ terraform apply   # creates staging's own resources\n$ terraform workspace select default\n$ terraform apply   # production, completely separate state</div><div class="found-p">Same config, same commands — but two entirely independent sets of real infrastructure, tracked in two separate state files behind the scenes.</div>` },

    varFile: { syntax:`terraform apply -var-file="&lt;file&gt;"`, cmd:`terraform apply -var-file="prod.tfvars"`, output:`<span class="dim">↳ loads variable values from prod.tfvars instead of using defaults</span>

var.instance_type = "t3.large"
var.environment    = "production"

<span class="ok">Plan: 1 to add, 0 to change, 0 to destroy.</span>`, does:`Loads a whole set of variable values from a file, instead of typing each one out individually on the command line.`, where:`Different environments (dev.tfvars, prod.tfvars) that need genuinely different settings for the exact same config.`, breakdown:[{term:`-var-file`, desc:`the flag — points at a .tfvars file`},{term:`&quot;prod.tfvars&quot;`, desc:`a plain file of key = value pairs, one per variable`}], whyUseful:`<div class="found-p">Production needs a bigger instance size and more replicas than dev — but you don't want two separate copies of an otherwise-identical config.</div><div class="found-pre"># prod.tfvars\ninstance_type = "t3.large"\nreplica_count = 5</div><div class="found-pre">$ terraform apply -var-file="prod.tfvars"</div><div class="found-p">One shared config, and an entirely different, appropriately-sized environment depending on which .tfvars file you point at.</div>` },

    varFlag: { syntax:`terraform apply -var="&lt;key&gt;=&lt;value&gt;"`, cmd:`terraform apply -var="instance_type=t3.large"`, output:`<span class="dim">↳ overrides just this one variable for this run only</span>

var.instance_type = "t3.large"

<span class="ok">Plan: 0 to add, 1 to change, 0 to destroy.</span>`, does:`Overrides a single variable's value directly on the command line, for just this one run.`, where:`A one-off test or a CI pipeline step that needs to pass in exactly one dynamic value, without a whole separate .tfvars file.`, breakdown:[{term:`-var`, desc:`the flag — one key=value pair`},{term:`&quot;instance_type=t3.large&quot;`, desc:`overrides that specific variable, just for this run`}], whyUseful:`<div class="found-p">A CI/CD pipeline needs to pass in a Docker image tag that changes on every single build — a static .tfvars file can't hold a value that's different every time.</div><div class="found-pre">$ terraform apply -var="image_tag=$GITHUB_SHA"</div><div class="found-p">The pipeline injects the exact right value fresh on every run, straight from an environment variable, no file to keep updating.</div>` },

    tfVarEnv: { syntax:`export TF_VAR_&lt;name&gt;=&lt;value&gt;`, cmd:`export TF_VAR_instance_type=t3.large`, output:`<span class="dim">↳ terraform automatically picks up any TF_VAR_* environment variable</span>

$ terraform plan
var.instance_type = "t3.large"  <span class="dim"># read from TF_VAR_instance_type</span>`, does:`Sets a Terraform variable's value through a shell environment variable — Terraform automatically looks for anything prefixed TF_VAR_.`, where:`CI/CD pipelines that already store configuration as environment/secret variables and shouldn't need a separate .tfvars file just for Terraform.`, breakdown:[{term:`TF_VAR_`, desc:`the required prefix — Terraform strips it and maps the rest to a matching variable name`},{term:`instance_type`, desc:`must exactly match a variable block's name in your .tf files`}], whyUseful:`<div class="found-p">A CI/CD system already has secrets configured as environment variables, and duplicating them into a separate .tfvars file means keeping two places in sync.</div><div class="found-pre">export TF_VAR_db_password="$SECRET_DB_PASSWORD"</div><div class="found-p">Terraform picks it up automatically — no extra file, and the secret never has to be written to disk anywhere in the pipeline.</div>` },

    sensitiveVar: { syntax:`variable "&lt;name&gt;" {\n  sensitive = true\n}`, cmd:`cat variables.tf`, output:`variable "db_password" {
  type      = string
  sensitive = true
}`, does:`Marks a variable's value as sensitive — Terraform redacts it from plan and apply output in the terminal and logs.`, where:`Passwords, API keys, and any secret value that would otherwise get printed in plain text right in a CI/CD log.`, breakdown:[{term:`sensitive`, desc:`the argument — set true to redact this value from all CLI output`}], whyUseful:`<div class="found-p">A database password variable gets printed in plain text in a plan's output, and that plan output is now sitting in a CI/CD log anyone with repo access can read.</div><div class="found-pre">  ~ password = "hunter2" -> "newpass123"   ← visible to anyone!\n\n  ~ password = (sensitive value)            ← with sensitive = true</div><div class="found-p">One line in the variable block, and that value never appears in plain text in a terminal or a log again — it's still used correctly, just never displayed.</div>` },

    backendBlock: { syntax:`terraform {\n  backend "&lt;type&gt;" {\n    ...\n  }\n}`, cmd:`cat backend.tf`, output:`terraform {
  backend "s3" {
    bucket = "my-company-tfstate"
    key    = "prod/network/terraform.tfstate"
    region = "us-east-1"
  }
}`, does:`Tells Terraform to store its state file remotely — in an S3 bucket, Azure Blob Storage, Terraform Cloud, etc. — instead of a local file on one laptop.`, where:`Any team of more than one person, always — a local-only state file means only one person can ever safely run apply.`, breakdown:[{term:`terraform { ... }`, desc:`a special top-level configuration block, not a resource`},{term:`backend &quot;s3&quot;`, desc:`which remote backend type to use`},{term:`bucket / key`, desc:`exactly where in that bucket this project's state file lives`}], whyUseful:`<div class="found-p">Two engineers both run terraform apply from their own laptops on the same day, each with their own local state file — and now nobody actually knows which one reflects reality.</div><div class="found-pre">terraform {\n  backend "s3" {\n    bucket = "my-company-tfstate"\n    key    = "prod/terraform.tfstate"\n  }\n}</div><div class="found-p">Now everyone reads and writes the exact same shared state file — this single block is the difference between a team that can safely collaborate on infrastructure and one that can't.</div>` },

    stateLock: { syntax:`dynamodb_table = "&lt;table&gt;"`, cmd:`cat backend.tf`, output:`terraform {
  backend "s3" {
    bucket         = "my-company-tfstate"
    key            = "prod/terraform.tfstate"
    dynamodb_table = "terraform-locks"
  }
}

<span class="dim">↳ if someone else is applying right now:</span>
<span class="err">Error: Error acquiring the state lock — lock already held by another user</span>`, does:`Adds a lock, backed by a separate table, so only one terraform apply can run against this state at a time — everyone else has to wait.`, where:`Preventing two people (or two CI pipeline runs) from applying to the exact same state simultaneously and corrupting it.`, breakdown:[{term:`dynamodb_table`, desc:`the DynamoDB table Terraform uses to hold the lock, alongside the S3 backend`}], whyUseful:`<div class="found-p">A CI pipeline and an engineer's laptop both happen to run terraform apply against the exact same project within seconds of each other.</div><div class="found-pre">Error: Error acquiring the state lock\n\nLock Info:\n  ID:        7a3f9d2c\n  Who:       ci-runner@github-actions</div><div class="found-p">Instead of both writing to the state file at once and silently corrupting it, the second run is blocked outright with a clear error — annoying for a moment, but exactly what prevents real damage.</div>` },

    targetFlag: { syntax:`terraform apply -target=&lt;address&gt;`, cmd:`terraform apply -target=aws_instance.web`, output:`<span class="warn">Warning: Resource targeting is in effect</span>

This plan was created with the -target option, which means the result of
this plan may not represent all of the changes requested by the current
configuration.

  # aws_instance.web will be created
  <span class="ok">+</span> resource "aws_instance" "web" { ... }

<span class="ok">Plan: 1 to add, 0 to change, 0 to destroy.</span>`, does:`Limits a plan or apply to just one specific resource (plus anything it depends on), instead of the entire config.`, where:`A large config where you need to fix or recreate just one broken resource without touching thirty unrelated ones — used carefully, and rarely.`, breakdown:[{term:`-target`, desc:`the flag — narrows the operation to one resource address`},{term:`aws_instance.web`, desc:`only this resource (and its dependencies) will be considered`}], whyUseful:`<div class="found-p">One resource in a large config is broken and needs to be recreated immediately, but a full apply would also touch a dozen unrelated resources you don't want to risk right now.</div><div class="found-pre">$ terraform apply -target=aws_instance.web</div><div class="found-p">Terraform explicitly warns this isn't the full picture — it's meant as a rare, deliberate escape hatch for exactly this kind of emergency, not routine day-to-day use.</div>` },

    autoApprove: { syntax:`terraform apply -auto-approve`, cmd:`terraform apply -auto-approve`, output:`aws_instance.web: Creating...
aws_instance.web: Creation complete after 24s [id=i-0abc123def456789]

<span class="ok">Apply complete! Resources: 1 added, 0 changed, 0 destroyed.</span>

<span class="dim">↳ no "Enter a value: yes" prompt — skipped entirely</span>`, does:`Skips the interactive "type yes to confirm" prompt and applies immediately.`, where:`Automated pipelines — nothing is sitting there waiting for a human to type "yes" in a CI job with no terminal attached.`, breakdown:[{term:`-auto-approve`, desc:`the flag — bypasses the confirmation prompt entirely`}], whyUseful:`<div class="found-p">A CI/CD pipeline runs terraform apply automatically after a merge — but there's no human at a keyboard to type "yes," and the job would just hang forever waiting.</div><div class="found-pre">- run: terraform apply -auto-approve</div><div class="found-p">The pipeline proceeds without stalling — the safety of that manual confirmation gets deliberately traded for automation, usually only after plan output was already reviewed as part of the PR.</div>` },

    lifecycleBlock: { syntax:`lifecycle {\n  prevent_destroy = true\n}`, cmd:`cat main.tf`, output:`resource "aws_db_instance" "main" {
  ...
  lifecycle {
    prevent_destroy = true
  }
}

$ terraform destroy
<span class="err">Error: Instance cannot be destroyed

Resource aws_db_instance.main has lifecycle.prevent_destroy set,
but the plan calls for this resource to be destroyed.</span>`, does:`A nested block that changes how Terraform manages a specific resource's lifecycle — prevent_destroy is one of several options, blocking any destroy of that resource outright.`, where:`Anything catastrophic to lose by accident — a production database being the textbook example.`, breakdown:[{term:`lifecycle`, desc:`a nested meta-block, valid inside any resource`},{term:`prevent_destroy`, desc:`set true to make Terraform refuse to destroy this resource, even if asked to`}], whyUseful:`<div class="found-p">Someone renames a database resource in a refactor, and Terraform's plan quietly shows it as "destroy the old one, create a new one" — which would delete real production data.</div><div class="found-pre">resource "aws_db_instance" "main" {\n  lifecycle {\n    prevent_destroy = true\n  }\n}</div><div class="found-p">With this in place, that exact scenario fails loudly and immediately instead of silently destroying a production database — a deliberate tripwire for your most critical resources.</div>` }
  };

  function runTerraformCmd(key, btn) {
    const d = TERRAFORM_CMDS[key];
    if (!d) return;
    const lines = d.cmd.split('\n');
    document.getElementById('tfCmd').textContent = lines[0];
    let extra = '';
    if (lines.length > 1) {
      extra = lines.slice(1).map(l => '<span class="ld-prompt">devops@server:~/infra$</span> ' + l).join('\n') + '\n';
    }
    document.getElementById('tfOutput').innerHTML = extra + d.output;
    document.getElementById('tfSyntax').innerHTML = d.syntax || lines[0];
    document.getElementById('tfDoes').innerHTML = d.does;
    document.getElementById('tfWhere').innerHTML = d.where;
    const bdList = document.getElementById('tfBreakdownList');
    if (bdList) {
      bdList.innerHTML = (d.breakdown && d.breakdown.length)
        ? d.breakdown.map(b => `<div class="sl-breakdown-item"><span class="sl-breakdown-term">${b.term}</span><span class="sl-breakdown-desc">${b.desc}</span></div>`).join('')
        : '<span class="dim">No further breakdown needed for this one.</span>';
    }
    const whyEl = document.getElementById('tfWhyUseful');
    if (whyEl) whyEl.innerHTML = d.whyUseful || '<span class="dim">—</span>';
    document.querySelectorAll('#tab-terraformdevops .ld-pill').forEach(p => p.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
